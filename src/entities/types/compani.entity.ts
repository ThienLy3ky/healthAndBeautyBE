import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Company extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  code: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({
    required: true,
    type: String,
    match: /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/,
  })
  phone: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  })
  email: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
