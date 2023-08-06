import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Account } from "./user.entity";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";
import { TypeBill } from "../enum/billType.enum";

class product {
  @Prop({ type: Mongoose.Schema.ObjectId, ref: "products" })
  product: DrugProduct;

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

  @Prop({ type: TypeBill })
  type: TypeBill;

  @Prop({ type: String, unique: true })
  address: string;

  @Prop({ type: String, unique: true })
  image: string;

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
