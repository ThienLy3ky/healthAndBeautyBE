import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  StyleProduct,
  StyleProductSchema,
} from "src/entities/types/style.entity";
import { StyleProductController } from "./controller";
import { StyleProductService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StyleProduct.name, schema: StyleProductSchema },
    ]),
  ],
  controllers: [StyleProductController],
  providers: [StyleProductService],
  exports: [
    MongooseModule.forFeature([
      { name: StyleProduct.name, schema: StyleProductSchema },
    ]),
  ],
})
export class StyleProductModule {}
