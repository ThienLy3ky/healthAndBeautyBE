import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Banner } from "src/entities/types/banner.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name)
    private readonly productTypeModel: Model<Banner>,
  ) {}

  async create(createBannerDto: any): Promise<Banner> {
    const newBanner = new this.productTypeModel(createBannerDto);
    return newBanner.save();
  }

  async findAll(query: GetAll): Promise<Banner[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<Banner> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateBannerDto: any): Promise<Banner> {
    return this.productTypeModel.findByIdAndUpdate(id, updateBannerDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<Banner> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
