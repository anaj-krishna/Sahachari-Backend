"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("@nestjs/config");
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
let GeminiService = class GeminiService {
    configService;
    model;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not defined in environment variables');
        }
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({ model: 'models/gemini-flash-latest' });
    }
    async chat(userMessage, history = []) {
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
        }
        catch (error) {
            console.error('Gemini error:', error);
            if (error.status === 429) {
                throw new common_1.HttpException('Saha is too busy right now, please try again in a moment!', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw new common_1.HttpException('Something went wrong with Saha, please try again!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map