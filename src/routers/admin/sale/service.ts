import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductType } from "src/entities/types/type.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductType>,
  ) {}

  async create(createProductTypeDto: any): Promise<ProductType> {
    const newProductType = new this.productTypeModel(createProductTypeDto);
    return newProductType.save();
  }

  async findAll(query: GetAll): Promise<ProductType[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<ProductType> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateProductTypeDto: any): Promise<ProductType> {
    return this.productTypeModel.findByIdAndUpdate(id, updateProductTypeDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<ProductType> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
