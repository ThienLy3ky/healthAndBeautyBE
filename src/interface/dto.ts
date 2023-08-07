import { IsNotEmpty, IsNumber, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Schema } from "mongoose";

export class Pagination {
  @ApiProperty({ default: 10, minimum: 1 })
  @IsNotEmpty()
  limit: number;

  @ApiProperty({ default: 1, minimum: 1 })
  @IsNotEmpty()
  page: number;
}
export class ByID {
  @ApiProperty({
    default: "64cd0e5c7e912e8e295b687d",
    type: Schema.Types.ObjectId,
  })
  @IsNotEmpty()
  @IsMongoId()
  id: Schema.Types.ObjectId;
}
