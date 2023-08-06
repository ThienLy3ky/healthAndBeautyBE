import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/entities/types/categories.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly productTypeModel: Model<Category>,
  ) {}

  async create(createCategoryDto: any): Promise<Category> {
    const newCategory = new this.productTypeModel(createCategoryDto);
    return newCategory.save();
  }

  async findAll(query: GetAll): Promise<Category[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<Category> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateCategoryDto: any): Promise<Category> {
    return this.productTypeModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<Category> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
