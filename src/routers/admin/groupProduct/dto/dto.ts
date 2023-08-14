import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateGroupProductSchema {
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
export class CreateGroupProductDto {
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

export class UpdateGroupProductDto {
  @ApiProperty({ required: true })
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
