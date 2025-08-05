import { useState } from 'react';
import type { Chat } from '../../../types/types';
import { ChatItem } from './ChatItem';

interface SidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onAddChat: () => void;
  onDeleteChat: (chatId: number) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({
  chats,
  selectedChat,
  onSelectChat,
  onAddChat,
  onDeleteChat,
  collapsed,
  onToggleCollapse
}: SidebarProps) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleAddChat = async () => {
    setIsCreating(true);
    await onAddChat();
    setIsCreating(false);
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-10 ${
      collapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-lg font-semibold">Conversas</h1>
        )}
        
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title={collapsed ? "Expandir" : "Recolher"}
        >
          <svg 
            className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleAddChat}
          disabled={isCreating}
          className={`w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 ${
            collapsed ? 'px-3' : ''
          }`}
          title="Nova conversa"
        >
          {isCreating ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          
          {!collapsed && (
            <span className="font-medium">Nova conversa</span>
          )}
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-4 pb-4 space-y-2">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChat?.id === chat.id}
                onSelect={() => onSelectChat(chat)}
                onDelete={() => onDeleteChat(chat.id)}
                collapsed={collapsed}
              />
            ))
          ) : (
            !collapsed && (
              <div className="text-gray-400 text-sm text-center py-8">
                Nenhuma conversa ainda.
                <br />
                Clique em "Nova conversa" para começar!
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            Chat AI Assistant
          </div>
        </div>
      )}
    </div>
  );
};