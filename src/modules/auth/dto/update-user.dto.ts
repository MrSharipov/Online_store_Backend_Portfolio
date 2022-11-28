import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  password?: string;
}
