import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ProductType } from "./entities/types/type.entity";
import { ProductSize } from "./entities/types/size.entity";
import { Category } from "./entities/types/categories.entity";
import { Setting } from "./entities/types/setting.entity";
@Injectable()
export class AppService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductType>,
    @InjectModel(ProductSize.name)
    private readonly productGroupModel: Model<ProductSize>,
    @InjectModel(Category.name)
    private readonly productCategoriesModel: Model<Category>,
    @InjectModel(Setting.name)
    private readonly settingModel: Model<Setting>,
  ) {}
  getHello(): string {
    return "Hello World!";
  }

  async getTemplate() {
    const [types, groups, categories, setting] = await Promise.all([
      this.productTypeModel
        .find({}, { _id: 1, name: 1, code: 1, image: 1 })
        .lean(),
      this.productGroupModel
        .find({}, { _id: 1, name: 1, code: 1, image: 1 })
        .lean(),
      this.productCategoriesModel
        .find({}, { _id: 1, name: 1, code: 1, image: 1 })
        .lean(),
      this.settingModel.find({}, { _id: 1, name: 1, code: 1, image: 1 }).lean(),
    ]);
    return { types, groups, categories, setting };
  }
}
