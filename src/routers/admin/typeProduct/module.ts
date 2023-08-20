import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductType, ProductTypeSchema } from "src/entities/types/type.entity";
import { ProductTypeController } from "./controller";
import { ProductTypeService } from "./service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { getNameFile } from "src/utils";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          return cb(null, `type-${getNameFile(req, file)}`);
        },
      }),
    }),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
  ],
})
export class ProductTypeModule {}
