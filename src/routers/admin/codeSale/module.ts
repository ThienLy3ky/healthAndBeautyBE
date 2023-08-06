import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CodeSale, CodeSaleSchema } from "src/entities/types/codeSale.entity";
import { CodeSaleController } from "./controller";
import { CodeSaleService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CodeSale.name, schema: CodeSaleSchema },
    ]),
  ],
  controllers: [CodeSaleController],
  providers: [CodeSaleService],
})
export class CodeSaleModule {}
