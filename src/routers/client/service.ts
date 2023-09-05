import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, GetAll } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import {
  checkExit,
  populatedAllPagination,
  populatedOneNotIdPagination,
} from "src/utils";
import { Sale } from "src/entities/types/sale.entity";
import { Banner } from "src/entities/types/banner.entity";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(DrugProduct.name)
    private readonly productModel: Model<DrugProduct>,
    @InjectModel(Sale.name)
    private readonly Sale: Model<Sale>,
    @InjectModel(Banner.name)
    private readonly Banner: Model<Banner>,
  ) {}

  async create(
    createDrugProductDto: CreateDrugProductDto,
  ): Promise<DrugProduct> {
    const newDrugProduct = new this.productModel(createDrugProductDto);
    return newDrugProduct.save();
  }

  async findHome() {
    const field = { _id: 1, name: 1 };
    const populatSale = {
      path: "product",
      populate: [
        {
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
        {
          path: "company type categories",
          select: field,
        },
      ],
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
      { limit: 30, page: 1, orderBy: "createdAt", order: "desc" },
      populateArr,
      populateObj,
    );
    const { items: flashProduct } = await populatedAllPagination(
      this.Sale,
      {},
      { limit: 30, page: 1, orderBy: "createdAt", order: "desc" },
      populatSale,
    );
    const [bannerText, bannerImage] = await Promise.all([
      this.Banner.find({ image: undefined }).limit(30).lean(),
      this.Banner.find({ image: { $ne: undefined } })
        .limit(30)
        .lean(),
    ]);
    return {
      newProduct,
      flashProduct,
      saleProduct: [],
      bannerText,
      bannerImage,
    };
  }

  async findDetail({ code }: CodeParam) {
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
    const data = await populatedOneNotIdPagination(
      this.productModel,
      { code },
      populateArr,
      populateObj,
    );
    const { items } = await populatedAllPagination(
      this.productModel,
      {
        $or: [
          { categories: data.categories },
          { type: data.type },
          { company: data.company },
        ],
      },
      { limit: 30, page: 1, orderBy: "createdAt", order: "desc" },
      populateArr,
      populateObj,
    );
    return { data, items };
  }

  async getSearch(query: GetAll): Promise<PaginationRes<DrugProduct>> {
    const field = { _id: 1, name: 1 };
    const { limit, page, key, order, orderBy, company, type, categories } =
      query;
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
    let where: any = {};
    if (key) where.name = { name: { $regex: key, $options: "i" } };
    if (company) where = { ...where, company };
    if (type) where = { ...where, type };
    if (categories) where = { ...where, categories };
    const { items, total } = await populatedAllPagination(
      this.productModel,
      where,
      { limit, page, order, orderBy },
      populateArr,
      populateObj,
    );
    return {
      items,
      page,
      limit,
      total,
      totalPages: items?.length,
    };
  }
  ///
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
