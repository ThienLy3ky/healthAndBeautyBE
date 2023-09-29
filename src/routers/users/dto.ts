import { IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfile {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: String })
  @IsString()
  sdt: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}
export class ChangePass {
  @ApiProperty({ type: String })
  @IsString()
  newPassWord: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}
export class AddAddress {
  @ApiProperty({ type: String })
  @IsString()
  addAddress: string;
}
export class CancelOrder {
  @ApiProperty({ type: String })
  @IsString()
  @Length(17, 20)
  code: string;
}
