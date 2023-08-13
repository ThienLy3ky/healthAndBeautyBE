import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Setting, SettingSchema } from "src/entities/types/setting.entity";
import { SettingController } from "./controller";
import { SettingService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
})
export class SettingModule {}
