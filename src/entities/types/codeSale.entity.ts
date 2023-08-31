import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";

@Schema({ collection: "sale-code", timestamps: true })
export class CodeSale extends Document {
  @Prop({
    type: String,
    required: true, // name is required
    trim: true,
  })
  code: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "products",
    required: true, // image is required
  })
  productId: DrugProduct;

  @Prop({
    type: Date,
    required: true,
    min: new Date(),
  })
  timeStart: string;

  @Prop({
    type: Date,
    required: true,
    min: new Date(),
  })
  timeEnd: string;

  @Prop({
    type: Number,
    required: true,
  })
  quanlity: number;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const CodeSaleSchema = SchemaFactory.createForClass(CodeSale);
