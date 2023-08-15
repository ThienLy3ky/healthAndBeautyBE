import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Setting } from "src/entities/types/setting.entity";
import { CreateSettingDto } from "./dto/dto";
import { checkExit } from "src/utils";
@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private readonly settingModel: Model<Setting>,
  ) {}

  async update(updateSettingDto: CreateSettingDto): Promise<Setting> {
    const checkExits = await checkExit(this.settingModel, {});

    return checkExits
      ? this.settingModel.findOneAndUpdate(updateSettingDto)
      : this.settingModel.create(updateSettingDto);
  }
}
