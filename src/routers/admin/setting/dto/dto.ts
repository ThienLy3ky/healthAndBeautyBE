import { IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiOperation } from "@nestjs/swagger";

export interface CreateSettingSchema {
  name: string;
  address: string;
  phone: string;
  email: string;
}
export class CreateSettingDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export interface UpdateSettingSchema {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export class UpdateSettingDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;
}
