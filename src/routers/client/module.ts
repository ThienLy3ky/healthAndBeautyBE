import { Module } from "@nestjs/common";
import { ClientController } from "./controller";
import { ClientService } from "./service";
import { DrugProductModule } from "../admin/product/module";
import { SaleModule } from "../admin/sale/module";
import { BannerModule } from "../admin/banner/module";

@Module({
  imports: [DrugProductModule, SaleModule, BannerModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
