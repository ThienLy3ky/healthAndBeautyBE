import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSettingDto {
  @ApiProperty()
  FBlink: string;

  @ApiProperty()
  Zalolink: string;

  @ApiProperty()
  SDT: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  address: string;
}
