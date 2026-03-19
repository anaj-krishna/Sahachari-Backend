import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ChatDto } from './dto/chat.dto';



@Controller('chat')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async chat(@Body() body: ChatDto) {
    const reply = await this.geminiService.chat(
      body.message,
      body.history || [],
    );
    return {
      reply,
      role: 'model',
    };
  }
}