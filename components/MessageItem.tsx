
import React from 'react';
import { Message, MessageType, EmbedContent } from '../types';
import EmbedMessage from './EmbedMessage';

interface MessageItemProps {
  message: Message;
  showAuthor: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, showAuthor }) => {

  const renderContent = () => {
    switch (message.type) {
      case MessageType.Embed:
        return <EmbedMessage content={message.content as EmbedContent} />;
      case MessageType.Image:
        return (
          <div className="mt-1 bg-black/20 p-1 rounded-lg max-w-sm inline-block">
            <img src={message.content as string} alt="Generated Avatar" className="rounded-md object-contain max-h-80" />
          </div>
        );
      case MessageType.Text:
      default:
        return <div className="whitespace-pre-wrap break-words text-gray-200">{message.content as string}</div>;
    }
  };
  
  if (showAuthor) {
      return (
         <div className="flex items-start pt-4 px-4 hover:bg-black/10">
              <img src={message.avatarUrl} alt={message.author} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <div className="flex items-baseline">
                    <p className={`font-semibold ${message.role === 'model' ? 'text-pink-400' : 'text-gray-300'}`}>{message.author}</p>
                    <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                </div>
                {renderContent()}
              </div>
          </div>
      );
  }
  
  return (
    <div className="flex items-center py-0.5 px-4 hover:bg-black/10">
        <div className="w-10 mr-4" /> {/* Spacer to align with messages that have avatars */}
        <div>
             {renderContent()}
        </div>
    </div>
  )
};

export default MessageItem;
