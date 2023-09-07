import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";
import { Schema } from "mongoose";

class CreateDrugProductSchema {
  @ApiProperty({ type: [String] })
  size: string[];

  @ApiProperty({ type: Number })
  productid: string;

  @ApiProperty({ type: Number })
  price: string;

  @ApiProperty({ type: [String] })
  species: string[];

  @ApiProperty({ type: [String] })
  group: string[];
}
export class GetAll extends Pagination {
  @ApiProperty({ required: false })
  key?: string;

  @ApiProperty({ required: false })
  order?: "asc" | "desc";

  @ApiProperty({ required: false })
  orderBy?: string;

  @ApiProperty({ required: false })
  categories?: string;

  @ApiProperty({ required: false })
  type?: string;

  @ApiProperty({ required: false })
  company?: string;

  @ApiProperty({
    required: false,
    isArray: true,
    maxLength: 2,
    minLength: 2,
    type: Number,
  })
  price?: [number];
}
export class CreateDrugProductDto {
  @ApiProperty()
  @IsNotEmpty()
  iduser: string;

  @ApiProperty()
  adress: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  sumprice: string;

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

  @ApiProperty({ type: [String] })
  company: [string];

  @ApiProperty({ type: [String] })
  type: [string];

  @ApiProperty({ type: [String] })
  categories: [string];
}

export class UpdateDrugProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

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
