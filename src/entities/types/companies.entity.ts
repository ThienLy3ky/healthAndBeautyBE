import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "companies", timestamps: true })
export class Company extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, unique: true })
  code?: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({
    type: String,
    match: /\d{3}-\d{3}-\d{4}/,
  })
  phone?: string;

  @Prop({
    type: String,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  })
  email?: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
