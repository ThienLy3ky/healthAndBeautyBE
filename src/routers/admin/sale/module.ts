import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Sale, SaleSchema } from "src/entities/types/sale.entity";
import { SaleController } from "./controller";
import { SaleService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
