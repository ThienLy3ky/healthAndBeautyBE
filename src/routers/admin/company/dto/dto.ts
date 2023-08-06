import { IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export interface CreateCompanySchema {
  name: string;
  address: string;
  phone: string;
  email: string;
}
export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export interface UpdateCompanySchema {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export class UpdateCompanyDto {
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
