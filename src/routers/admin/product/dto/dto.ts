import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";
import { Schema } from "mongoose";

class CreateDrugProductSchema {
  @ApiProperty({ type: Schema.Types.ObjectId })
  size: Schema.Types.ObjectId;

  @ApiProperty({ type: Number })
  priceOlder: string;

  @ApiProperty({ type: Number })
  priceNew: string;

  @ApiProperty({ type: Schema.Types.ObjectId })
  species: Schema.Types.ObjectId;

  @ApiProperty({ type: Schema.Types.ObjectId })
  group: Schema.Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  image: string;
}
export class GetAll extends Pagination {
  @ApiProperty({ required: false })
  key?: string;

  @ApiProperty({ required: false })
  order?: "asc" | "desc";

  @ApiProperty({ required: false })
  orderBy?: string;
}
export class CreateDrugProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  summary: string;

  @ApiProperty({
    isArray: true,
    type: () => [String],
  })
  // @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  // @IsString({ each: true })
  // @ArrayMinSize(1)
  keyWord: string[];

  @ApiProperty({ type: [CreateDrugProductSchema] })
  price: CreateDrugProductSchema[];

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Schema.Types.ObjectId })
  company: Schema.Types.ObjectId;

  @ApiProperty({ type: Schema.Types.ObjectId })
  type: Schema.Types.ObjectId;

  @ApiProperty({ type: Schema.Types.ObjectId })
  categories: Schema.Types.ObjectId;
}

export class UpdateDrugProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  keyWord: string[];

  @ApiProperty({ type: CreateDrugProductSchema })
  price: CreateDrugProductSchema[];

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Schema.Types.ObjectId })
  company: Schema.Types.ObjectId;

  @ApiProperty({ type: Schema.Types.ObjectId })
  type: Schema.Types.ObjectId;

  @ApiProperty({ type: Schema.Types.ObjectId })
  categoriies: Schema.Types.ObjectId;
}
