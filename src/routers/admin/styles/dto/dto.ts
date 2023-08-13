import { IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiOperation } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateStyleProductSchema {
  name: string;
  image: string;
  code: string;
}
export class GetAll extends Pagination {
  @ApiProperty()
  @IsNotEmpty()
  key: string;
}
export class CreateStyleProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  description: string;
}

export class UpdateStyleProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  description: string;
}
