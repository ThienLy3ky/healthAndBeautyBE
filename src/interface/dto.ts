import { IsNotEmpty, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Pagination {
  @ApiProperty({ default: 10, minimum: 1 })
  limit?: number;

  @ApiProperty({ default: 1, minimum: 1 })
  page?: number;
}
export class ByID {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
export class CodeParam {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
export class PaginationRes<T> {
  items: T[];
  totalPages: number;
  page: number;
  total: number;
  limit: number;
}
