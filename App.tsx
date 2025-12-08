
import React, { useState, useCallback } from 'react';
import { Message, MessageType, EmbedContent } from './types';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import ChannelHeader from './components/ChannelHeader';
import { chatWithKaoruko, generateAvatar } from './services/geminiService';
import { KAORUKO_AVATAR_URL, HELP_MESSAGE, INITIAL_MESSAGE } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const createMessage = (
    role: 'user' | 'model', 
    content: string | EmbedContent, 
    type: MessageType, 
    author: string, 
    avatarUrl: string
  ): Message => ({
    id: Date.now() + Math.random(),
    role,
    content,
    type,
    author,
    avatarUrl,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage = createMessage('user', text, MessageType.Text, 'User', 'https://picsum.photos/seed/user/48/48');
    addMessage(userMessage);
    setIsLoading(true);

    try {
      if (text.startsWith('/')) {
        await handleSlashCommand(text);
      } else {
        const history = messages.slice(-6);
        const botResponseText = await chatWithKaoruko(history, text);
        addMessage(createMessage('model', botResponseText, MessageType.Text, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage(createMessage('model', "Oh no! My system is having a little trouble right now. Please try again in a moment! 😿", MessageType.Text, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleSlashCommand = async (command: string) => {
    const parts = command.trim().split(' ');
    const baseCommand = parts[0];
    const args = parts.slice(1);

    let botMessage: Message | null = null;

    switch (baseCommand) {
      case '/help':
        botMessage = createMessage('model', HELP_MESSAGE, MessageType.Embed, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL);
        break;
      
      case '/hug':
        const target = args[0] || 'you';
        const hugEmbed: EmbedContent = {
          title: 'Aww ~ Kaoruko gives a warm hug! 🌸',
          description: `*Kaoruko wraps ${target} in a soft, sparkly hug — you feel cozy!*`,
          footer: `Requested by User`,
          color: 'pink',
        };
        botMessage = createMessage('model', hugEmbed, MessageType.Embed, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL);
        break;

      case '/fact':
        const fact = await chatWithKaoruko([], "Tell me a cute anime fact.");
        botMessage = createMessage('model', fact, MessageType.Text, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL);
        break;

      case '/avatar':
        try {
            const imageUrl = await generateAvatar();
            botMessage = createMessage('model', imageUrl, MessageType.Image, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL);
        } catch (e) {
             botMessage = createMessage('model', "Gomen'nasai! I couldn't generate an avatar right now. Please try again in a little bit, okay? 💖", MessageType.Text, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL);
        }
        break;

      default:
        botMessage = createMessage('model', `Hee hee, I don't know that command. Try /help for a list of things I can do! ✨`, MessageType.Text, 'ᴋᴀᴏʀᴜᴋᴏ', KAORUKO_AVATAR_URL);
    }
    
    if (botMessage) {
        addMessage(botMessage);
    }
  };

  return (
    <div className="flex h-screen text-gray-300 font-sans">
      <Sidebar />
      <main className="flex flex-col flex-1 bg-[#36393f]">
        <ChannelHeader />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col flex-1">
            <ChatWindow messages={messages} isLoading={isLoading} />
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
          <UserList />
        </div>
      </main>
    </div>
  );
};

export default App;
