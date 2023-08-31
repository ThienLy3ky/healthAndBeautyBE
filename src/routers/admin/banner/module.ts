import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Banner, BannerSchema } from "src/entities/types/banner.entity";
import { BannerController } from "./controller";
import { BannerService } from "./service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { getNameFile } from "src/utils";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          return cb(null, `type-${getNameFile(req, file)}`);
        },
      }),
    }),
  ],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
})
export class BannerModule {}
