import { IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiOperation } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateCategorySchema {
  name: string;
  image: string;
  code: string;
  description: string;
}
export class GetAll extends Pagination {
  @ApiProperty()
  key: string;
}
export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  description: string;
}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  description: string;
}
