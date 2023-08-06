import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "species", timestamps: true })
export class SpeciesProduct extends Document {
  @Prop({
    type: String,
    required: true, // name is required
    trim: true,
  })
  name: string;

  @Prop({
    type: String, // image is required
    match: /^https?:\/\/.+/, // image must be a valid URL
  })
  image: string;

  @Prop({
    type: String,
    minlength: 3, // code must have at least 3 characters
    maxlength: 10,
    trim: true, // code must have at most 10 characters
  })
  code: string;

  @Prop({
    type: String,
    maxlength: 155,
    trim: true, // code must have at most 10 characters
  })
  description: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const SpeciesProductSchema =
  SchemaFactory.createForClass(SpeciesProduct);
