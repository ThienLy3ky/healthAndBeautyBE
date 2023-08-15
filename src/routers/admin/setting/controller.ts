import {
  Body,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from "@nestjs/common";
import { SettingService } from "./service";
import { Setting } from "src/entities/types/setting.entity";
import { CreateSettingDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("setting")
@ApiBearerAuth()
@ApiTags("Setting")
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  async update(@Body() updateSetting: CreateSettingDto): Promise<Setting> {
    return this.settingService.update(updateSetting);
  }
}
