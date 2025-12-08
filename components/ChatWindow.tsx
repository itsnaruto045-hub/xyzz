
import React, { useRef, useEffect } from 'react';
import { Message, MessageType } from '../types';
import MessageItem from './MessageItem';
import { KAORUKO_AVATAR_URL } from '../constants';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto" id="messages">
      <div className="px-4 space-y-0.5 my-4">
        {messages.map((msg, index) => {
            const prevMessage = messages[index - 1];
            // Show author and avatar if it's the first message, or if the author is different from the previous one.
            const showAuthor = !prevMessage || prevMessage.author !== msg.author || msg.type === MessageType.Embed;
            return <MessageItem key={msg.id} message={msg} showAuthor={showAuthor} />
        })}
        {isLoading && (
          <div className="flex items-start py-1 px-4 space-x-4">
            <img src={KAORUKO_AVATAR_URL} alt="Kaoruko Avatar" className="w-10 h-10 rounded-full opacity-0" />
            <div className="flex items-center space-x-2 rounded-lg p-3">
                <p className="text-gray-400 italic text-sm">Kaoruko is typing...</p>
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
