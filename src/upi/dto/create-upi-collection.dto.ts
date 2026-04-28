import { IsString, Matches } from "class-validator";

export class CreateUpiCollectionDto {
  
  @IsString()
  name: string;

  @IsString()
  @Matches(/^[\w.-]+@[\w.-]+$/)
  upiId: string;

  @IsString()
  @Matches(/^[6-9]\d{9}$/)
  phoneNumber: string;
}