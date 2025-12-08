
export enum MessageType {
    Text = 'text',
    Embed = 'embed',
    Image = 'image',
}

export interface EmbedContent {
    title: string;
    description: string;
    footer?: string;
    color?: 'pink' | 'blue' | 'green';
}

export interface Message {
    id: number;
    role: 'user' | 'model' | 'system';
    content: string | EmbedContent;
    type: MessageType;
    avatarUrl: string;
    author: string;
    timestamp: string;
}
