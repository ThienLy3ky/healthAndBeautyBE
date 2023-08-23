import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateProductTypeSchema {
  name: string;
  image: string;
  code: string;
}
export class GetAll extends Pagination {
  @ApiProperty({ required: false })
  key?: string;

  @ApiProperty({ required: false })
  order?: "asc" | "desc";

  @ApiProperty({ required: false })
  orderBy?: string;
}
export class CreateProductTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}

export class UpdateProductTypeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image?: string;
}
