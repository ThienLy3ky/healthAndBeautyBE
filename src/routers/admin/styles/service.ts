import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StyleProduct } from "src/entities/types/style.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class StyleProductService {
  constructor(
    @InjectModel(StyleProduct.name)
    private readonly productTypeModel: Model<StyleProduct>,
  ) {}

  async create(createStyleProductDto: any): Promise<StyleProduct> {
    const newStyleProduct = new this.productTypeModel(createStyleProductDto);
    return newStyleProduct.save();
  }

  async findAll(query: GetAll): Promise<StyleProduct[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<StyleProduct> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    updateStyleProductDto: any,
  ): Promise<StyleProduct> {
    return this.productTypeModel.findByIdAndUpdate(id, updateStyleProductDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<StyleProduct> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
