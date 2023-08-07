import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";

@Schema({ collection: "sales", timestamps: true })
export class Sale extends Document {
  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "products",
    required: true, // image is required
  })
  productId: DrugProduct[];

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

export const SaleSchema = SchemaFactory.createForClass(Sale);