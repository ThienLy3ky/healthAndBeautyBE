import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Banner, BannerSchema } from "src/entities/types/banner.entity";
import { BannerController } from "./controller";
import { BannerService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
