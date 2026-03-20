import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

const SYSTEM_PROMPT = `
You are Saha, a helpful assistant for Sahachari — a local ecommerce platform 
that connects customers with nearby stores and delivery partners.

You help customers with:
- Browsing and finding products
- Placing and tracking orders
- Understanding order statuses (PLACED, READY, ACCEPTED, PICKED_UP, DELIVERED)
- Cancelling orders
- Delivery related queries

Order status flow:
PLACED → READY → ACCEPTED → PICKED_UP → DELIVERED
Any order can be CANCELLED before it is PICKED_UP.

Rules:
- Stay on topic. Only answer ecommerce/order/product related questions.
- If asked something unrelated, politely redirect to Sahachari topics.
- Be friendly, concise, and helpful.
- Do not make up product or order details — tell user to check the app.
`;

@Injectable()
export class GeminiService {
  private model;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'models/gemini-flash-latest' });
  }
  async chat(
    userMessage: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[] = [],
  ): Promise<string> {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: 'Who are you and what can you do?' }],
          },
          {
            role: 'model',
            parts: [{ text: SYSTEM_PROMPT }],
          },
          ...history,
        ],
      });

      const result = await chat.sendMessage(userMessage);
      return result.response.text();

    } catch (error) {
      console.error('Gemini error:', error);
      if (error.status === 429) {
        throw new HttpException(
          'Saha is too busy right now, please try again in a moment!',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        'Something went wrong with Saha, please try again!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
 
}