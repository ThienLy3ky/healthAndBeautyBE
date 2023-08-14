import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "categories", timestamps: true })
export class Category extends Document {
  @Prop({
    type: String,
    required: true, // name is required
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    match: /^https?:\/\/.+/, // image must be a valid URL
  })
  image: string;

  @Prop({
    type: String,
    trim: true, // code must have at most 10 characters
  })
  code?: string;

  @Prop({
    type: String,
    maxlength: 155,
    trim: true, // code must have at most 10 characters
  })
  description?: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
