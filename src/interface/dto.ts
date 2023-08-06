import { IsNotEmpty, IsNumber, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";

export class Pagination {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limt: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page: string;
}
export class ByID {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: ObjectId;
}
