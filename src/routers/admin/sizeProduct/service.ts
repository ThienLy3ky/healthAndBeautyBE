import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductSize } from "src/entities/types/size.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectModel(ProductSize.name)
    private readonly productTypeModel: Model<ProductSize>,
  ) {}

  async create(createProductSizeDto: any): Promise<ProductSize> {
    const newProductSize = new this.productTypeModel(createProductSizeDto);
    return newProductSize.save();
  }

  async findAll(query: GetAll): Promise<ProductSize[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<ProductSize> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateProductSizeDto: any): Promise<ProductSize> {
    return this.productTypeModel.findByIdAndUpdate(id, updateProductSizeDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<ProductSize> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
