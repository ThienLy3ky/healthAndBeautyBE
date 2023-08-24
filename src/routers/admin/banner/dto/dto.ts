import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Pagination } from "src/interface/dto";
import { BannnerType } from "src/entities/enum/typeBanner.enum";
import { Schema } from "mongoose";

export interface CreateBannerSchema {
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
export class CreateBannerDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  type: BannnerType;

  @ApiProperty({ type: Schema.Types.ObjectId })
  product: Schema.Types.ObjectId;
}

export class UpdateBannerDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  type: BannnerType;

  @ApiProperty({ type: Schema.Types.ObjectId })
  product: Schema.Types.ObjectId;
}
