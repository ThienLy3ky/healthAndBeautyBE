import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Mongoose, { Document } from "mongoose";
import { Admin } from "./admin.entity";
import { DrugProduct } from "./product.entity";

@Schema({ collection: "sales", timestamps: true })
export class Sale extends Document {
  @Prop({
    type: [Mongoose.Schema.ObjectId],
    ref: "DrugProduct",
    required: true, // image is required
  })
  product: DrugProduct[];

  @Prop({
    type: Date,
    required: true,
  })
  dateSale: Date;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Mongoose.Schema.ObjectId,
    ref: "account-admin",
    default: null,
  })
  isdeleted: Admin;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
