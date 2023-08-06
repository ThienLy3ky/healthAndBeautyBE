import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Setting, SettingSchema } from "src/entities/types/setting.entity";
import { SettingController } from "./controller";
import { SettingService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Setting", schema: SettingSchema }]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
