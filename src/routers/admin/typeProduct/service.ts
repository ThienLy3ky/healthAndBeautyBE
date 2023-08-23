import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductType } from "src/entities/types/type.entity";
import { CreateProductTypeDto, GetAll, UpdateProductTypeDto } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { FindAll, FindAllPagination, checkExit } from "src/utils";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductType>,
  ) {}

  async create(payload: CreateProductTypeDto): Promise<ProductType> {
    const { code } = payload;
    const isExit = await checkExit(this.productTypeModel, {
      code: code,
    });
    if (isExit) throw new BadRequestException("data wrong");
    const newProductType = new this.productTypeModel(payload);
    return newProductType.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<ProductType>> {
    const { limit, page, key, order, orderBy } = query;
    const { items, total } =
      limit && limit > 0
        ? await FindAllPagination(
            this.productTypeModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
          )
        : await FindAll(
            this.productTypeModel,
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

  async findOne({ id }: ByID): Promise<ProductType> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    payload: UpdateProductTypeDto,
  ): Promise<ProductType> {
    const isExit = await checkExit(this.productTypeModel, {
      _id: id,
    });
    if (!isExit) throw new BadRequestException("data wrong");
    return this.productTypeModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<ProductType> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
  async checkCode({ code }: CodeParam): Promise<boolean> {
    return (await checkExit(this.productTypeModel, {
      code: code,
    }))
      ? true
      : false;
  }
}
