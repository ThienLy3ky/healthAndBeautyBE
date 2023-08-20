import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DrugProduct,
  DrugProductSchema,
} from "src/entities/types/product.entity";
import { DrugProductController } from "./controller";
import { DrugProductService } from "./service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { getNameFile } from "src/utils";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DrugProduct.name, schema: DrugProductSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          return cb(null, `product-${getNameFile(req, file)}`);
        },
      }),
    }),
  ],
  controllers: [DrugProductController],
  providers: [DrugProductService],
})
export class DrugProductModule {}
