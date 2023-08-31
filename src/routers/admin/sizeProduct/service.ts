import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductSize } from "src/entities/types/size.entity";
import { CreateProductSizeDto, GetAll, UpdateProductSizeDto } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { FindAll, FindAllPagination, checkExit } from "src/utils";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectModel(ProductSize.name)
    private readonly productSizeModel: Model<ProductSize>,
  ) {}

  async create(payload: CreateProductSizeDto): Promise<ProductSize> {
    const { code } = payload;
    const isExit = await checkExit(this.productSizeModel, {
      code: code,
    });
    if (isExit) throw new BadRequestException("data wrong");
    const newProductSize = new this.productSizeModel(payload);
    return newProductSize.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<ProductSize>> {
    const { limit, page, key, order, orderBy } = query;
    const { items, total } =
      limit && limit > 0
        ? await FindAllPagination(
            this.productSizeModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
          )
        : await FindAll(
            this.productSizeModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { order, orderBy },
          );
    return {
      items,
      page,
      limit,
      total,
      totalPages: items?.length,
    };
  }

  async findOne({ id }: ByID): Promise<ProductSize> {
    return this.productSizeModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    payload: UpdateProductSizeDto,
  ): Promise<ProductSize> {
    const { code } = payload;
    const isExit = await checkExit(this.productSizeModel, {
      _id: id,
    });
    const checkCode = await checkExit(this.productSizeModel, {
      _id: { $ne: id },
      code: code,
    });
    if (!isExit || checkCode) throw new BadRequestException("data wrong");
    return this.productSizeModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<ProductSize> {
    return this.productSizeModel.findByIdAndDelete(id);
  }
  async checkCode({ code }: CodeParam): Promise<boolean> {
    return (await checkExit(this.productSizeModel, {
      code: code,
    }))
      ? true
      : false;
  }
}
