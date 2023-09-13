import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Bill, BillSchema } from "src/entities/types/bill.entity";
import { BillController } from "./controller";
import { BillService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
  controllers: [BillController],
  providers: [BillService],
  exports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
})
export class BillModule {}
