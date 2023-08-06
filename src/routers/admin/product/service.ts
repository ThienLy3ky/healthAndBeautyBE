import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DrugProduct } from "src/entities/types/product.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class DrugProductService {
  constructor(
    @InjectModel(DrugProduct.name)
    private readonly productTypeModel: Model<DrugProduct>,
  ) {}

  async create(createDrugProductDto: any): Promise<DrugProduct> {
    const newDrugProduct = new this.productTypeModel(createDrugProductDto);
    return newDrugProduct.save();
  }

  async findAll(query: GetAll): Promise<DrugProduct[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<DrugProduct> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateDrugProductDto: any): Promise<DrugProduct> {
    return this.productTypeModel.findByIdAndUpdate(id, updateDrugProductDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<DrugProduct> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
