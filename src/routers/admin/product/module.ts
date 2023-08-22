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
import { getNameFile, makeid } from "src/utils";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DrugProduct.name, schema: DrugProductSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          console.log("🚀 ~ file: module.ts:22 ~ file:", file);
          const date = new Date();
          return cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [DrugProductController],
  providers: [DrugProductService],
})
export class DrugProductModule {}
