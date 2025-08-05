import { useState } from 'react';
import type { Chat } from '../../../types/types';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  collapsed: boolean;
}

export const ChatItem = ({ chat, isSelected, onSelect, onDelete, collapsed }: ChatItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-ps-red-dark border border-white-600' 
          : 'hover:bg-ps-red-dark border border-transparent'
      } ${collapsed ? 'justify-center' : ''}`}
      title={collapsed ? chat.name : ''}
    >
      {/* Chat Icon */}
      <div className={`flex-shrink-0 ${collapsed ? '' : 'mr-1'}`}>
        <svg 
          className="w-5 h-5 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </div>

      {/* Chat Name */}
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 truncate">
            {truncateText(chat.name, 25)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(chat.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      )}

      {/* Delete Button */}
      {!collapsed && (
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {showDeleteConfirm ? (
            <div className="flex gap-1">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                title="Confirmar exclusão"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleCancelDelete}
                className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                title="Cancelar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Excluir conversa"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};