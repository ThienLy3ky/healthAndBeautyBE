import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "blogs", timestamps: true })
export class Blog extends Document {
  @Prop({
    type: String,
    required: true, // name is required
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    match: /^https?:\/\/.+/, // image must be a valid URL
  })
  image?: string;

  @Prop({
    type: String,
    trim: true, // code must have at most 10 characters
  })
  content?: string;

  @Prop({
    type: Number,
    default: 0, // code must have at most 10 characters
  })
  view?: number;

  @Prop({
    type: Number,
    default: 0, // code must have at most 10 characters
  })
  like?: number;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
