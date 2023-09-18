import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, GetAll, UpdateDrugProductDto } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { checkExit, populatedAll, populatedAllPagination } from "src/utils";
import { uploadFile } from "src/firebase";
import { Sale } from "src/entities/types/sale.entity";

@Injectable()
export class DrugProductService {
  constructor(
    @InjectModel(DrugProduct.name)
    private readonly productModel: Model<DrugProduct>,
    @InjectModel(Sale.name)
    private readonly sale: Model<Sale>,
  ) {}

  async create(
    createDrugProductDto: CreateDrugProductDto,
  ): Promise<DrugProduct> {
    const newDrugProduct = new this.productModel(createDrugProductDto);
    return newDrugProduct.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<DrugProduct>> {
    const field = { _id: 1, name: 1 };
    const { limit, page, key, order, orderBy } = query;
    const populateArr = {
        path: "price",
        populate: [
          {
            path: "size",
            model: "ProductSize",
            select: field,
          },
          {
            path: "group",
            model: "GroupProduct",
            select: field,
          },
          {
            path: "style",
            model: "StyleProduct",
            select: field,
          },
        ],
      },
      populateObj = {
        path: "company type categories",
        select: field,
      };
    const { items, total } =
      limit && limit > 0
        ? await populatedAllPagination(
            this.productModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
            populateArr,
            populateObj,
          )
        : await populatedAll(
            this.productModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { order, orderBy },
            populateArr,
            populateObj,
          );
    return {
      items: items,
      page,
      limit,
      total,
      totalPages: items?.length,
    };
  }

  async findOne({ id }: ByID): Promise<DrugProduct> {
    return this.productModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    payload: UpdateDrugProductDto,
  ): Promise<DrugProduct> {
    const isExit = await checkExit(this.productModel, {
      _id: id,
    });
    if (!isExit) throw new BadRequestException("data wrong");
    return this.productModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<DrugProduct> {
    return this.productModel.findByIdAndDelete(id);
  }

  async checkCode({ code }: CodeParam): Promise<boolean> {
    return (await checkExit(this.productModel, {
      code: code,
    }))
      ? true
      : false;
  }
  async Upload(images: any[]) {
    const list = [];
    if (images.length <= 0) {
      return;
      //   return await uploadFile(images.path);
    }
    for (let index = 0; index < images.length; index++) {
      const element = await uploadFile(images[index].path);
      list.push(element[0]);
    }
    return list;
  }
  async Sale({
    ListSale,
    dateSale,
    PriceSale,
  }: {
    ListSale: string[];
    dateSale: Date;
    PriceSale: number;
  }) {
    return this.sale.create({ product: ListSale, dateSale, price: PriceSale });
  }
}
