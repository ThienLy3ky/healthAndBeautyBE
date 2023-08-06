import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Setting } from "src/entities/types/setting.entity";
// import { CreateSettingDto } from "./create-company.dto";
// import { UpdateSettingDto } from "./update-company.dto";

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private readonly companyModel: Model<Setting>,
  ) {}

  async create(createSettingDto: any): Promise<Setting> {
    console.log(
      "🚀 ~ file: service.ts:15 ~ SettingService ~ create ~ createSettingDto:",
      createSettingDto,
    );
    const newSetting = new this.companyModel(createSettingDto);
    return newSetting.save();
  }

  async findAll(): Promise<Setting[]> {
    return this.companyModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Setting> {
    return this.companyModel.findById(id).lean().exec();
  }

  async update(id: string, updateSettingDto: any): Promise<Setting> {
    return this.companyModel.findByIdAndUpdate(id, updateSettingDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Setting> {
    return this.companyModel.findByIdAndDelete(id);
  }
}
