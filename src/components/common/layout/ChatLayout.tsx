import { useState, useEffect } from 'react';
import { chatService } from '../../../services/chatService';
import type { Chat, ChatMessage } from '../../../types/types';
import { ChatInterface } from '../chat/ChatInterface';
import { Sidebar } from '../sidebar/Sidebar';


export const ChatLayout = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const ChatService = new chatService();
      const fetchedChats = await ChatService.getChats();
      setChats(fetchedChats);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        setIsLoading(true);
        const ChatService = new chatService();
        const fetchedMessages = await ChatService.getMessages(selectedChat.id);
        setMessages(fetchedMessages);
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  const handleAddChat = async () => {
    const ChatService = new chatService();
    const newChat: Partial<Chat> = {
      name: `Nova Conversa ${chats.length + 1}`,
      user_id: 1
    };
    
    const addedChat = await ChatService.addChat(newChat);
    if (addedChat && addedChat.length > 0) {
      setChats([...chats, addedChat[0]]);
      setSelectedChat(addedChat[0]);
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    const ChatService = new chatService();
    await ChatService.deleteChat(chatId);
    
    const fetchChats = async () => {
      const ChatService = new chatService();
      const fetchedChats = await ChatService.getChats();
      setChats(fetchedChats);
    };
    
    fetchChats();
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedChat || !content.trim()) return;

    const newMessage: ChatMessage = {
      sessionId: selectedChat.id,
      message: {
        type: 'human',
        content: content.trim()
      }
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const ChatService = new chatService();
      const response = await ChatService.addMessage(selectedChat.id, newMessage.message);
      
      if (response.status === 200) {
        const responseData = await response.json();
        const responseMessage: ChatMessage = {
          sessionId: selectedChat.id,
          message: {
            type: 'ai',
            content: responseData.output
          }
        };
        setMessages(prev => [...prev, responseMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen ">
      <Sidebar
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onAddChat={handleAddChat}
        onDeleteChat={handleDeleteChat}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
        <ChatInterface
          selectedChat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};