import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateBannerSchema {
  name: string;
  image: string;
  code: string;
}
export class GetAll extends Pagination {
  @ApiProperty()
  key: string;
}
export class CreateBannerDto {
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

export class UpdateBannerDto {
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
