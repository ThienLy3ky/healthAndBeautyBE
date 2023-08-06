import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";

@Schema({ collection: "account-admin", timestamps: true })
export class Admin extends Document {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true, minlength: 8 })
  password: string;

  @Prop({ required: true, default: false })
  isActive: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
