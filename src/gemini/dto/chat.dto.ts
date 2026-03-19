import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MessagePartDto {
  @IsString()
  text: string;
}

class ChatHistoryDto {
  @IsString()
  role: 'user' | 'model';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessagePartDto)
  parts: MessagePartDto[];
}

export class ChatDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatHistoryDto)
  history?: ChatHistoryDto[];
}