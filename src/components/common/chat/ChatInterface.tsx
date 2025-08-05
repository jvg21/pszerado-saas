import { useEffect, useRef } from 'react';
import type { Chat, ChatMessage } from '../../../types/types';
import { WelcomeScreen } from './WelcomeScreen';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatInterfaceProps {
  selectedChat: Chat | null;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export const ChatInterface = ({ 
  selectedChat, 
  messages, 
  onSendMessage, 
  isLoading 
}: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedChat) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header - altura fixa */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedChat.name}
            </h2>
            <p className="text-sm text-gray-500">
              Conversa iniciada em {new Date(selectedChat.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          {/* Chat Actions */}
          <div className="flex items-center gap-2">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Configurações do chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages - área scrollável independente */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Input - altura fixa */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <MessageInput 
          onSendMessage={onSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};