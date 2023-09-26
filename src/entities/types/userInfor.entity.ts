import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Account } from "./user.entity";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";

class cart {
  @Prop({ type: Mongoose.Schema.ObjectId, ref: "products" })
  product: DrugProduct;

  @Prop({
    type: Number,
    required: true,
  })
  quanlity: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  status: boolean;
}

@Schema({ collection: "information", timestamps: true })
export class Information extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String] })
  address?: string[];

  @Prop({ type: String })
  image: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    required: true,
    ref: "Account",
  })
  accountId: Account;

  @Prop({ type: cart })
  cartID: cart[];

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
