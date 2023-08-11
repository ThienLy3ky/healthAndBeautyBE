//information
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { ProductSize } from "./size.entity";
import { SpeciesProduct } from "./species.entity";
import { GroupProduct } from "./group.entity";
import { ProductType } from "./type.entity";
import { Company } from "./companies.entity";
import { Category } from "./categories.entity";

export type DrugProductDocument = DrugProduct & Document;
class Price {
  @Prop({ type: Mongoose.Schema.ObjectId, ref: "sizes" })
  size: ProductSize;

  @Prop({ type: Number, min: 0 })
  priceOlder: number;

  @Prop({ type: Number, required: true, min: 0 })
  priceNew: number;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "groups" })
  group: GroupProduct;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "species" })
  species?: SpeciesProduct;

  @Prop({ type: Number, required: true, min: 0 })
  quantity: number;

  @Prop({
    type: String, // image is required
    // match: /^https?:\/\/.+/, // image must be a valid URL
  })
  image: string;
}

@Schema({ collection: "product", timestamps: true })
export class DrugProduct {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  summary?: string;

  @Prop({ type: String })
  keyWord?: string[];

  @Prop({ type: Price, min: 0 })
  price: Price[];

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "companies" })
  company: Company;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "types" })
  type: ProductType;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "categories" })
  categories: Category;

  @Prop({
    type: Date,
    validate: {
      validator: isFutureDate,
      message: "Expiration date must be in the future",
    },
  })
  expirationDate: Date;
  @Prop({
    type: Date,
    validate: {
      validator: isFutureDate,
      message: "Expiration date must be in the future",
    },
  })
  dateOfProduction: Date;
}

export const DrugProductSchema = SchemaFactory.createForClass(DrugProduct);

function isFutureDate(value) {
  return value > new Date();
}
