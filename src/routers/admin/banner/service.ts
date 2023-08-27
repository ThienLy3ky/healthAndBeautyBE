import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Banner } from "src/entities/types/banner.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";
import { checkExit } from "src/utils";
import { deleteFile } from "src/firebase";

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<Banner>,
  ) {}

  async create(createBannerDto: any): Promise<Banner> {
    const newBanner = new this.bannerModel(createBannerDto);
    return newBanner.save();
  }

  async findAll(query: GetAll): Promise<Banner[]> {
    return this.bannerModel.find().populate("product").lean().exec();
  }

  async findOne({ id }: ByID): Promise<Banner> {
    return this.bannerModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateBannerDto: any): Promise<Banner> {
    const isExit = await checkExit(this.bannerModel, {
      _id: id,
    });
    if (!isExit) throw new BadRequestException("data wrong");
    return this.bannerModel.findByIdAndUpdate(id, updateBannerDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<Banner> {
    const isExit = await checkExit(this.bannerModel, {
      _id: id,
    });
    if (!isExit) throw new BadRequestException("data wrong");
    if (isExit.image && isExit.image != "") deleteFile(isExit.image);
    return this.bannerModel.findByIdAndDelete(id);
  }
}
