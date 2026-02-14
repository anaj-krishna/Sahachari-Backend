import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuperAdminLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
