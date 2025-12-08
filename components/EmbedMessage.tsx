
import React from 'react';
import { EmbedContent } from '../types';

interface EmbedMessageProps {
  content: EmbedContent;
}

const EmbedMessage: React.FC<EmbedMessageProps> = ({ content }) => {
  const colorClasses = {
    pink: 'border-pink-400',
    blue: 'border-blue-400',
    green: 'border-green-400',
  };

  const borderColorClass = colorClasses[content.color || 'pink'];

  return (
    <div className={`bg-[#2f3136] border-l-4 ${borderColorClass} rounded mt-1 max-w-lg`}>
        <div className="p-4">
          {content.title && (
            <h3 className="font-bold text-base mb-2 text-white">{content.title}</h3>
          )}
          {content.description && (
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{content.description}</p>
          )}
          {content.footer && (
            <p className="text-xs text-gray-400 mt-4">{content.footer}</p>
          )}
        </div>
    </div>
  );
};

export default EmbedMessage;
