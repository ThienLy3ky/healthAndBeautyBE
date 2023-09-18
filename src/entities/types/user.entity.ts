import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "accounts", timestamps: true })
export class Account extends Document {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String })
  codeVerify: string;

  @Prop({ type: Date })
  expVerify: Date;

  @Prop({ type: String })
  sdt: string;

  @Prop({ type: String, required: true, minlength: 8 })
  password_hash: string;

  @Prop({ type: String })
  FB: string;

  @Prop({ type: String })
  Zalo: string;

  @Prop({ type: String })
  email: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: false, default: false })
  refreshToken: string;
  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
