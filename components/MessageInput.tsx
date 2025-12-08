
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
  };

  return (
    <div className="px-4 pb-4">
      <form onSubmit={handleSubmit} className="relative bg-[#40444b] rounded-lg flex items-center">
        <button type="button" className="p-2.5 cursor-pointer">
          <PlusIcon />
        </button>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Chat with Kaoruko... (try /help)"
          disabled={isLoading}
          className="flex-1 bg-transparent px-2 py-2.5 resize-none placeholder-gray-500 focus:outline-none disabled:opacity-50 text-gray-200"
          rows={1}
          autoFocus
        />
      </form>
    </div>
  );
};

export default MessageInput;
