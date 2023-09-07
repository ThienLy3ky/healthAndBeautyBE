import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ProductType } from "./entities/types/type.entity";
import { ProductSize } from "./entities/types/size.entity";
import { Category } from "./entities/types/categories.entity";
import { Setting } from "./entities/types/setting.entity";
import { GroupProduct } from "./entities/types/group.entity";
import { StyleProduct } from "./entities/types/style.entity";
import { Company } from "./entities/types/companies.entity";
@Injectable()
export class AppService {
  constructor(
    @InjectModel(GroupProduct.name)
    private readonly productGroupModel: Model<GroupProduct>,
    @InjectModel(StyleProduct.name)
    private readonly productStyleModel: Model<StyleProduct>,
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductType>,
    @InjectModel(ProductSize.name)
    private readonly productSizeModel: Model<ProductSize>,
    @InjectModel(Category.name)
    private readonly productCategoriesModel: Model<Category>,

    @InjectModel(Company.name)
    private readonly CompanyModel: Model<Company>,
    @InjectModel(Setting.name)
    private readonly settingModel: Model<Setting>,
  ) {}
  getHello(): string {
    return "Hello World!";
  }

  async getTemplate() {
    const [types, categories, setting, companies] = await Promise.all([
      this.productTypeModel
        .find({}, { _id: 1, name: 1, code: 1, image: 1 })
        .lean(),

      this.productCategoriesModel
        .find({}, { _id: 1, name: 1, code: 1, image: 1 })
        .lean(),
      this.settingModel.findOne().lean(),
      this.CompanyModel.find({}, { _id: 1, name: 1, code: 1 }).lean(),
    ]);
    return { types, categories, setting, companies };
  }
  async getGroupPrice() {
    const [groups, sizes, styles] = await Promise.all([
      this.productGroupModel.find({}, { _id: 1, name: 1, code: 1 }).lean(),
      this.productSizeModel.find({}, { _id: 1, name: 1, code: 1 }).lean(),
      this.productStyleModel.find({}, { _id: 1, name: 1, code: 1 }).lean(),
      // this.settingModel.findOne().lean(),
    ]);
    return { groups, sizes, styles };
  }
}
