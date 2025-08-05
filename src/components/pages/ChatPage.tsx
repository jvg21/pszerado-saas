import { useEffect, useState } from "react";
import { chatService } from "../../services/chatService";
import type { Chat, ChatMessage} from "../../types/types";

export const ChatPage = () => {
    const [inputText, setInputText] = useState<string>(''); // State for the input field
    const [chats, setChats] = useState<Chat[]>([]); // State to hold chat history
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // State for the selected chat
    const [messages, setMessages] = useState<ChatMessage[]>([]); // State to hold chat messages

    useEffect(() => {
        const fetchChats = async () => {
            const ChatService = new chatService();
            const fetchedChats = await ChatService.getChats();
            setChats(fetchedChats);
        }
        fetchChats();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedChat) {
                const ChatService = new chatService();
                const fetchedMessages = await ChatService.getMessages(selectedChat.id);
                setMessages(fetchedMessages);
                console.log("Fetched messages:", fetchedMessages);

            }
        }
        fetchMessages();
    }, [selectedChat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!selectedChat || !inputText.trim()) return;

        const newMessage: ChatMessage = {
            sessionId: selectedChat.id,
            message: {
                type: 'human',
                content: inputText.trim()
            }
        }

        setMessages([...messages, newMessage]);
        setInputText(''); // Clear the input field after sending
        const ChatService = new chatService();
        const response = await ChatService.addMessage(selectedChat.id, newMessage.message);
        if (response.status !== 200) {
            console.error("Error sending message:", response);
            setInputText(inputText.trim()); // Clear the input field after sending
            return;
        }
        const responseData = await response.json();
        console.log(responseData.output);
        const responseMessage: ChatMessage = {
            sessionId: selectedChat.id,
            message: {
                type: 'ai',
                content: `${responseData.output}` // Assuming the response contains the AI's reply
            }
        }
        setMessages([...messages, responseMessage]);

    };


    const handleAddChat = async () => {
        const ChatService = new chatService();
        const newChat: Partial<Chat> = {
            name: `New Chat ${chats.length + 1}`,
            user_id: 1
        }
        const addedChat = await ChatService.addChat(newChat);
        if (addedChat && addedChat.length > 0) {
            setChats([...chats, addedChat[0]]);
        }
    };

    const handleDeleteChat = async (chatId: number) => {
        const ChatService = new chatService();
        await ChatService.deleteChat(chatId);

         const fetchChats = async () => {
            const ChatService = new chatService();
            const fetchedChats = await ChatService.getChats();
            setChats(fetchedChats);
        }
        fetchChats();
        setSelectedChat(null);
    }



    return (
        <div className="d-flex flex-row justify-content-between align-items-start">
            <div>
                <h2>Chat History</h2>
                <button onClick={ handleAddChat}>Add New Chat</button>
                <ul>
                    {chats.map((chat) => (
                        <div key={chat.id} onClick={() => setSelectedChat(chat)}>
                            {chat.name}
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id) }}>Delete</button>
                        </div>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Chat Page</h1>
                {
                    selectedChat ? <h2>Selected Chat: {selectedChat.name}</h2> : <h2>Select a chat to view messages</h2>
                }
                {
                    messages.length > 0 ? (
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>
                                    <strong>{message.message.type === 'human' ? 'You' : 'AI'}:</strong> {message.message.content}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No messages in this chat.</p>
                    )
                }


                <input type="text" onChange={handleInputChange} disabled={!selectedChat ? true : false} placeholder="Type your message here..." />
                <button onClick={() => { handleSendMessage() }} disabled={!selectedChat ? true : false} >Send</button>
            </div>

        </div>
    );
}
