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
      this.productTypeModel.find().lean(),
      this.productGroupModel.find().lean(),
      this.productCategoriesModel.find().lean(),
      this.settingModel.find().lean(),
    ]);
    return { types, groups, categories, setting };
  }
}
