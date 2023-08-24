import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "accounts", timestamps: true })
export class Account extends Document {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, unique: true })
  sdt: string;

  @Prop({ type: String, required: true, minlength: 8 })
  password: string;

  @Prop({ type: String, unique: true })
  FB: string;

  @Prop({ type: String, unique: true })
  Zalo: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
