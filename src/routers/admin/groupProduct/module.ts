import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductType, ProductTypeSchema } from "src/entities/types/type.entity";
import { ProductTypeController } from "./controller";
import { ProductTypeService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
