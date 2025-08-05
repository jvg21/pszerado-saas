import { SupabaseClient } from "../config/supabase";
import type { Chat, ChatMessage, Message } from "../types/types";

export class chatService {

    n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || "";
    n8nWebhookKey = import.meta.env.VITE_N8N_WEBHOOK_KEY || "";

    async getChats() {
        // Fetch chats from supabase

        const { data, error } = await SupabaseClient
            .from(`chat`)
            .select('*')

        if (error) {
            console.error("Error fetching chats:", error);
            return []
        }

        return data
    }

    async addChat(chat: Partial<Chat>) {
        // Add a new chat to supabase
        const { data, error } = await SupabaseClient
            .from('chat')
            .insert([chat])
            .select()

        if (error) {
            console.error("Error adding chat:", error); 
        }
        return data
    }

    async deleteChat(chatId:number) {
        // Delete a chat from supabase

        const {data:deletedData} = await SupabaseClient
            .from('chat').select('*')
            .eq('id', chatId)

        const { data, error } = await SupabaseClient
            .from('chat')
            .delete()
            .eq('id', chatId)

        if (error) {
            console.error("Error deleting chat:", error);   
        }
        
        return {data:deletedData,deleted:data}
    }

    async getMessages(chatId: number): Promise<ChatMessage[]> {
        // Fetch messages for a specific chat from supabase
        const { data, error } = await SupabaseClient
            .from('n8n_chat_histories')
            .select('*')
            .eq('session_id', chatId);

        if (error) {
            console.error("Error fetching messages:", error);
            return []; // return an empty array on error
        }

        return data;
    }



    async addMessage(chatId: number, newMessage: Message) {
        // Add a new message to a specific chat in supabase
        const response = await fetch(`${this.n8nWebhookUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'n8n-webhook-key': this.n8nWebhookKey
            },
            body: JSON.stringify({
                chatId,
                newMessage
            })
        });

        return response;
    }

    // async deleteMessage(chatId, messageId) {
    //     // Delete a message from a specific chat in supabase
    //     return {}
    // }

    // async updateMessage(chatId, messageId, newMessage) {
    //     // Update a message in a specific chat in supabase
    //     return {}
    // }
}