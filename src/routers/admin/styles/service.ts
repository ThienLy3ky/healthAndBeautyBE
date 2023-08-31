import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StyleProduct } from "src/entities/types/style.entity";
import { GetAll } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { FindAll, FindAllPagination, checkExit } from "src/utils";

@Injectable()
export class StyleProductService {
  constructor(
    @InjectModel(StyleProduct.name)
    private readonly productStyleModel: Model<StyleProduct>,
  ) {}

  async create(payload: any): Promise<StyleProduct> {
    const { code } = payload;
    const isExit = await checkExit(this.productStyleModel, {
      code: code,
    });
    if (isExit) throw new BadRequestException("data wrong");
    const newStyleProduct = new this.productStyleModel(payload);
    return newStyleProduct.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<StyleProduct>> {
    const { limit, page, key, order, orderBy } = query;
    const { items, total } =
      limit && limit > 0
        ? await FindAllPagination(
            this.productStyleModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
          )
        : await FindAll(
            this.productStyleModel,
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

  async findOne({ id }: ByID): Promise<StyleProduct> {
    return this.productStyleModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    updateStyleProductDto: any,
  ): Promise<StyleProduct> {
    const { code } = updateStyleProductDto;
    const isExit = await checkExit(this.productStyleModel, {
      _id: id,
    });
    const checkCode = await checkExit(this.productStyleModel, {
      _id: { $ne: id },
      code: code,
    });
    if (!isExit || checkCode) throw new BadRequestException("data wrong");
    return this.productStyleModel.findByIdAndUpdate(id, updateStyleProductDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<StyleProduct> {
    return this.productStyleModel.findByIdAndDelete(id);
  }
  async checkCode({ code }: CodeParam): Promise<boolean> {
    return (await checkExit(this.productStyleModel, {
      code: code,
    }))
      ? true
      : false;
  }
}
