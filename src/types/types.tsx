export type Chat = {
    id: number;
    name: string;
    messages?: string[];
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
};

export type Message = {
    type:'ai'|'human';
    content: string;
}
export type ChatMessage = {
    id?: number;
    sessionId: number;
    message: Message;
}