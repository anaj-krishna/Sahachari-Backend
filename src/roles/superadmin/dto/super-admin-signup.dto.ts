import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class SuperAdminSignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  // optional — frontend can send detailed address fields instead
  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  taluk?: string;

  @IsOptional()
  @IsString()
  localBodyType?: string;

  @IsOptional()
  @IsString()
  localBodyName?: string;

  @IsOptional()
  @IsString()
  ward?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @Matches(/^\d{6}$/)
  pincode?: string;

  // keep location optional in DTO — service will derive it from address fields if omitted
  @IsOptional()
  @IsNotEmpty()
  location?: string;
}
