import { IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiOperation } from "@nestjs/swagger";
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
  @ApiProperty()
  key: string;
}
export class CreateDrugProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
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
