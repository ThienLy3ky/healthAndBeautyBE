import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  SpeciesProduct,
  SpeciesProductSchema,
} from "src/entities/types/species.entity";
import { SpeciesProductController } from "./controller";
import { SpeciesProductService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SpeciesProduct.name, schema: SpeciesProductSchema },
    ]),
  ],
  controllers: [SpeciesProductController],
  providers: [SpeciesProductService],
})
export class SpeciesProductModule {}
