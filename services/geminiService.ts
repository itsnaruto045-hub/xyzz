
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { Message, MessageType } from '../types';
import { SYSTEM_PROMPT, AVATAR_GENERATION_PROMPT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to format chat history for the API
const formatHistoryForAPI = (messages: Message[]) => {
  return messages
    .filter(msg => typeof msg.content === 'string' && (msg.role === 'user' || msg.role === 'model'))
    .map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content as string }],
    }));
};

export const chatWithKaoruko = async (history: Message[], newMessage: string): Promise<string> => {
  try {
    const formattedHistory = formatHistoryForAPI(history);
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: newMessage }] }
        ],
        config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.8,
            topP: 0.95,
            maxOutputTokens: 450,
        }
    });

    return response.text || "Eek! I'm a little stuck right now. Sorry! 😥";
  } catch (error) {
    console.error("Error in Gemini text generation:", error);
    throw new Error("Failed to get response from Kaoruko AI.");
  }
};

export const generateAvatar = async (): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: AVATAR_GENERATION_PROMPT }],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString: string = part.inlineData.data;
                return `data:image/png;base64,${base64EncodeString}`;
            }
        }
        throw new Error("No image data found in the response.");
    } catch (error) {
        console.error("Error in Gemini image generation:", error);
        throw new Error("Failed to generate avatar.");
    }
};
