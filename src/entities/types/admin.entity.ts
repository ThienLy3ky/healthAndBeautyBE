import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "account-admin", timestamps: true })
export class Admin extends Document {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, minlength: 8 })
  password_hash: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: false, default: false })
  refreshToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
