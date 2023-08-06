import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GroupProduct } from "src/entities/types/group.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class GroupProductService {
  constructor(
    @InjectModel(GroupProduct.name)
    private readonly productTypeModel: Model<GroupProduct>,
  ) {}

  async create(createGroupProductDto: any): Promise<GroupProduct> {
    const newGroupProduct = new this.productTypeModel(createGroupProductDto);
    return newGroupProduct.save();
  }

  async findAll(query: GetAll): Promise<GroupProduct[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<GroupProduct> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    updateGroupProductDto: any,
  ): Promise<GroupProduct> {
    return this.productTypeModel.findByIdAndUpdate(id, updateGroupProductDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<GroupProduct> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
