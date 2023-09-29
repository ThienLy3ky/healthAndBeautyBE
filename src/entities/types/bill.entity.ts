import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Account } from "./user.entity";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";
import { TypeBill, TypePayment } from "../enum/billType.enum";
import { ProductSize } from "./size.entity";
import { StyleProduct } from "./style.entity";
import { GroupProduct } from "./group.entity";
import { StatusBill } from "../enum/status.enum";
class product {
  @Prop({ type: Mongoose.Schema.ObjectId, ref: "DrugProduct" })
  product: DrugProduct;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "ProductSize" })
  size: ProductSize;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "GroupProduct" })
  group: GroupProduct;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "StyleProduct" })
  style?: StyleProduct;

  @Prop({ type: Number, required: true, min: 0 })
  quanlity: number;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
  })
  discount: number;

  @Prop({
    type: String,
  })
  image: string;
}

@Schema({ collection: "bills", timestamps: true })
export class Bill extends Document {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Number, enum: TypeBill })
  type: TypeBill;

  @Prop({ type: Number, enum: StatusBill, default: StatusBill.Pendding })
  status: StatusBill;

  @Prop({ type: Number, enum: TypePayment })
  paymentType: TypePayment;

  @Prop({ type: product })
  Product: product[];

  @Prop({ type: String })
  address: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    required: true,
    ref: "Account",
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
  })
  delivery: number;

  @Prop({
    type: Number,
  })
  ship: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  wasPayment: boolean;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
