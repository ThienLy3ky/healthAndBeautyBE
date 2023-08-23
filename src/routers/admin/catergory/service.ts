import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/entities/types/categories.entity";
import { CreateCategoryDto, GetAll, UpdateCategoryDto } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { FindAll, FindAllPagination, checkExit } from "src/utils";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoriesModel: Model<Category>,
  ) {}

  async create(payload: CreateCategoryDto): Promise<Category> {
    const { code } = payload;
    const isExit = await checkExit(this.categoriesModel, {
      code: code,
    });
    if (isExit) throw new BadRequestException("data wrong");
    const newCategory = new this.categoriesModel(payload);
    return newCategory.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<Category>> {
    const { limit, page, key, order, orderBy } = query;
    const { items, total } =
      limit && limit > 0
        ? await FindAllPagination(
            this.categoriesModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
          )
        : await FindAll(
            this.categoriesModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { order, orderBy },
          );
    return {
      items,
      page,
      limit,
      total,
      totalPages: 1,
    };
  }

  async findOne({ id }: ByID): Promise<Category> {
    return this.categoriesModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, payload: UpdateCategoryDto): Promise<Category> {
    const isExit = await checkExit(this.categoriesModel, {
      _id: id,
    });
    if (!isExit) throw new BadRequestException("data wrong");
    return this.categoriesModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<Category> {
    return this.categoriesModel.findByIdAndDelete(id);
  }
  async checkCode({ code }: CodeParam): Promise<boolean> {
    return (await checkExit(this.categoriesModel, {
      code: code,
    }))
      ? true
      : false;
  }
}
