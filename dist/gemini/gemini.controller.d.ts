import { GeminiService } from './gemini.service';
import { ChatDto } from './dto/chat.dto';
export declare class GeminiController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    chat(body: ChatDto): Promise<{
        reply: string;
        role: string;
    }>;
}
