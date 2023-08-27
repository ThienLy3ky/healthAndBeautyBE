import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { DrugProduct } from "./product.entity";
import { BannnerType } from "../enum/typeBanner.enum";

@Schema({ collection: "banner", timestamps: true })
export class Banner extends Document {
  @Prop({ type: String })
  image: string;

  @Prop({ type: Mongoose.Schema.ObjectId, ref: "DrugProduct" })
  product: DrugProduct;

  @Prop({
    enum: BannnerType,
    required: true,
  })
  type: BannnerType;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
