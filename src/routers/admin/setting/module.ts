import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "src/entities/types/companies.entity";
import { CompanyController } from "./controller";
import { CompanyService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
