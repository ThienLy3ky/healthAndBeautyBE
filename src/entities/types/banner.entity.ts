import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { DrugProduct } from "./product.entity";
import { BannnerType } from "../enum/typeBanner.enum";

@Schema({ collection: "banner", timestamps: true })
export class Banner extends Document {
  @Prop({ type: String, unique: true })
  image: string;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "products" })
  product: DrugProduct;

  @Prop({
    type: BannnerType,
    required: true,
  })
  type: BannnerType;

  @Prop({
    type: String,
    required: true,
  })
  content: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
