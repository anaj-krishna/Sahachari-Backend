declare class MessagePartDto {
    text: string;
}
declare class ChatHistoryDto {
    role: 'user' | 'model';
    parts: MessagePartDto[];
}
export declare class ChatDto {
    message: string;
    history?: ChatHistoryDto[];
}
export {};
