import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginBodyDTO {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDTO {
  access_token: string;
  refresh_token: string;
}
