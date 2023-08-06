import {
  Body,
  Controller,
  Delete,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { SettingService } from "./service";
import { Setting } from "src/entities/types/setting.entity";
import { CreateSettingDto, UpdateSettingDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("setting")
@ApiBearerAuth()
@ApiTags("Setting")
export class SettingController {
  constructor(private readonly companyService: SettingService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createSetting: CreateSettingDto) {
    return this.companyService.create(createSetting);
  }

  @Get()
  async findAll(): Promise<Setting[]> {
    return this.companyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Setting> {
    return this.companyService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSetting: UpdateSettingDto,
  ) {
    return this.companyService.update(id, updateSetting);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.companyService.remove(id);
  }
}
