import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";

@Schema({ collection: "types", timestamps: true })
export class ProductType extends Document {
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
    type: String, // convert code to uppercase
    minlength: 3, // code must have at least 3 characters
    maxlength: 10, // code must have at most 10 characters
  })
  code?: string;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
// Define the table type schema
