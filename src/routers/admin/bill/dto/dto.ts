import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";

export interface CreateBillSchema {
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
export class CreateBillDto {
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
export class CodeParame {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}

export class UpdateBillDto {
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
