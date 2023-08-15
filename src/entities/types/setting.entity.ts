import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";

import { Admin } from "./admin.entity";

@Schema({ collection: "setting", timestamps: true })
export class Setting extends Document {
  @Prop({
    type: String, // name is required
    trim: true,
    match: /^https?:\/\/.+/,
  })
  FBlink: string;

  @Prop({
    type: String, // name is required
    trim: true,
    match: /^https?:\/\/.+/,
  })
  Zalolink: string;

  @Prop({
    type: String, // name is required
    trim: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  })
  email: string;

  @Prop({
    type: String, // name is required
    trim: true,
  })
  SDT: string;

  @Prop({
    type: String, // image is required
    match: /^https?:\/\/.+/, // image must be a valid URL
  })
  image: string;

  @Prop({
    type: String,
    trim: true, // code must have at most 10 characters
  })
  address: string;

  @Prop({
    type: String,
    trim: true, // code must have at most 10 characters
  })
  description: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isUpdate: Admin;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
