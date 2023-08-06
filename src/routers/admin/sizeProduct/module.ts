import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSize, ProductSizeSchema } from "src/entities/types/size.entity";
import { ProductSizeController } from "./controller";
import { ProductSizeService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSize.name, schema: ProductSizeSchema },
    ]),
  ],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
})
export class ProductSizeModule {}
