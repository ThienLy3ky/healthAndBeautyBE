import { IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiOperation } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateGroupProductSchema {
  name: string;
  image: string;
  code: string;
}
export class GetAll extends Pagination {
  @ApiProperty()
  @IsNotEmpty()
  key: string;
}
export class CreateGroupProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}

export class UpdateGroupProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
