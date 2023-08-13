import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Account } from "./user.entity";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";
import { TypeBill } from "../enum/billType.enum";
import { ProductSize } from "./size.entity";
import { StyleProduct } from "./style.entity";
import { GroupProduct } from "./group.entity";
class product {
  @Prop({ type: Mongoose.Schema.ObjectId, ref: "products" })
  product: DrugProduct;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "sizes" })
  size: ProductSize;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "groups" })
  group: GroupProduct;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "style" })
  taste?: StyleProduct;

  @Prop({ type: Number, required: true, min: 0 })
  quantity: number;

  @Prop({
    type: String, // image is required
    // match: /^https?:\/\/.+/, // image must be a valid URL
  })
  image: string;
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
    type: Number,
    required: true,
  })
  discount: number;
}

@Schema({ collection: "bills", timestamps: true })
export class Bill extends Document {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Number, enum: TypeBill })
  type: TypeBill;

  @Prop({ type: product })
  Product: product[];

  @Prop({ type: String, unique: true })
  address: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    required: true,
    ref: "accounts",
  })
  accountId: Account;

  @Prop({
    type: Number,
    required: true,
  })
  sumPrice: number;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({
    type: Number,
    required: true,
  })
  status: number;

  @Prop({
    type: Number,
    required: true,
  })
  delivery: number;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
