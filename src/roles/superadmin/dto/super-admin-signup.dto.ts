import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SuperAdminSignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  location: string;
}
