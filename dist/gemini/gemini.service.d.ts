import { ConfigService } from '@nestjs/config';
export declare class GeminiService {
    private configService;
    private model;
    constructor(configService: ConfigService);
    chat(userMessage: string, history?: {
        role: 'user' | 'model';
        parts: {
            text: string;
        }[];
    }[]): Promise<string>;
}
