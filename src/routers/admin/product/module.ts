import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DrugProduct,
  DrugProductSchema,
} from "src/entities/types/product.entity";
import { DrugProductController } from "./controller";
import { DrugProductService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DrugProduct.name, schema: DrugProductSchema },
    ]),
  ],
  controllers: [DrugProductController],
  providers: [DrugProductService],
})
export class DrugProductModule {}
