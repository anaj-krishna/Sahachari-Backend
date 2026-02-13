import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString() // You can use @IsMobilePhone() for stricter validation
  mobileNumber?: string;

  @IsOptional()
  @IsString() // You can use @IsMobilePhone() for stricter validation
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  serviceablePincodes?: string[];
}
