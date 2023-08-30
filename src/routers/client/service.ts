import { Banner } from "src/entities/types/banner.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, UpdateDrugProductDto } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import {
  checkExit,
  populatedAll,
  populatedAllPagination,
  populatedOnePagination,
} from "src/utils";
import { uploadFile } from "src/firebase";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(DrugProduct.name)
    private readonly productModel: Model<DrugProduct>,
    private readonly Banner: Model<Banner>,
  ) {}

  async create(
    createDrugProductDto: CreateDrugProductDto,
  ): Promise<DrugProduct> {
    const newDrugProduct = new this.productModel(createDrugProductDto);
    return newDrugProduct.save();
  }

  async findHome(): Promise<DrugProduct[]> {
    const field = { _id: 1, name: 1 };
    const populatSale = {
      path: "product",
      populate: {
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
    };
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
    const { items: newProduct } = await populatedAllPagination(
      this.productModel,
      {},
      { limit: 20, page: 1, order: "createAt", orderBy: "desc" },
      populateArr,
      populateObj,
    );
    const { items: saleProduct } = await populatedAllPagination(
      this.Banner,
      {},
      { limit: 20, page: 1, order: "createAt", orderBy: "desc" },
      populateArr,
      populateObj,
    );
    return;
    newProduct;
  }

  async findDetail({ id }: ByID): Promise<DrugProduct> {
    const field = { _id: 1, name: 1 };
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
    return populatedOnePagination(
      this.productModel,
      id,
      populateArr,
      populateObj,
    );
  }

  async getSearch(
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

  async profile({ id }: ByID): Promise<DrugProduct> {
    return this.productModel.findByIdAndDelete(id);
  }

  async checkCode({ code }: CodeParam): Promise<boolean> {
    return (await checkExit(this.productModel, {
      code: code,
    }))
      ? true
      : false;
  }
}
