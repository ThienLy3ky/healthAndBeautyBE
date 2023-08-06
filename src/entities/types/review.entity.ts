import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Account } from "./user.entity";
import { DrugProduct } from "./product.entity";

@Schema({ collection: "review", timestamps: true })
export class Admin extends Document {
  @Prop({ type: Mongoose.Schema.ObjectId, ref: "accounts" })
  User: Account;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "products" })
  product: DrugProduct;

  @Prop({ type: String, required: true, default: false })
  comment: string;

  @Prop({ type: Number, required: true, min: 0, max: 5 })
  rating: number;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
