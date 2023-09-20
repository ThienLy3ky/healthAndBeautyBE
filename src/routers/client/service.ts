import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, GetAll } from "./dto/dto";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import {
  makeid,
  populatedAllPagination,
  populatedOneNotIdPagination,
  populatedSearchAllPagination,
} from "src/utils";
import { Sale } from "src/entities/types/sale.entity";
import { Banner } from "src/entities/types/banner.entity";
import { UsersService } from "../users/users.service";
import { Bill } from "src/entities/types/bill.entity";
import { TypePayment } from "src/entities/enum/billType.enum";
import { BannnerType } from "src/entities/enum/typeBanner.enum";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(DrugProduct.name)
    private readonly productModel: Model<DrugProduct>,
    @InjectModel(Sale.name)
    private readonly Sale: Model<Sale>,
    @InjectModel(Banner.name)
    private readonly Banner: Model<Banner>,
    private readonly user: UsersService,
    @InjectModel(Bill.name)
    private readonly bill: Model<Bill>,
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
    const [{ product: lisIdBestSale }] = await this.bill.aggregate([
      { $unwind: "$Product" },
      {
        $project: {
          _id: 1,
          product: "$Product.product",
          quanl: "$Product.quanlity",
        },
      },
      {
        $group: {
          _id: "$product",
          myCount: { $sum: 1 },
          sum: { $sum: "$quanl" },
        },
      },
      {
        $sort: { myCount: -1, sum: -1 },
      },
      { $limit: 30 },
      { $group: { _id: 0, product: { $push: { $toString: "$_id" } } } },
    ]);
    const { items: saleProduct } = await populatedAllPagination(
      this.productModel,
      { _id: { $in: lisIdBestSale } },
      { limit: 30, page: 1, orderBy: "createdAt", order: "desc" },
      populateArr,
      populateObj,
    );
    const {
      items: [flashProduct],
    } = await populatedAllPagination(
      this.Sale,
      {},
      { limit: 30, page: 1, orderBy: "createdAt", order: "desc" },
      populatSale,
    );

    const [bannerText, bannerImage] = await Promise.all([
      this.Banner.find({ image: undefined }).limit(30).lean(),
      this.Banner.find({
        /* image: { $ne: undefined } */ type: BannnerType.pannnerSale,
      })
        .limit(30)
        .lean(),
      this.productModel,
    ]);
    return {
      newProduct,
      flashProduct,
      bannerText,
      saleProduct,
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
    const {
      limit,
      page,
      key,
      order,
      orderBy,
      company,
      type,
      categories,
      price,
    } = query;
    console.log(
      "🚀 ~ file: service.ts:210 ~ ClientService ~ getSearch ~ price:",
      price,
    );
    const [min, max] = price;
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
      populateObj = [
        {
          path: "company",
          select: field,
        },
        {
          path: "type",
          select: field,
        },
        ,
        {
          path: "categories",
          select: field,
        },
      ];
    let where: any = {};
    if (key) where.name = { name: { $regex: key, $options: "i" } };
    if (company) where = { ...where, company: { $in: company } };
    if (type) where = { ...where, type: { $in: type } };
    if (categories) where = { ...where, categories: { $in: categories } };
    if (price)
      where = { ...where, "price.priceNew": { $gt: price[0], $lt: price[1] } };
    const { items, total } = await populatedSearchAllPagination(
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

  async payment(
    userData: any,
    data: {
      name: string;
      phone: string;
      address: any;
      typePayment: TypePayment;
      product: any;
    },
  ): Promise<any> {
    const user = await this.user.findOne(userData._id);
    if (!user) throw new UnauthorizedException();
    const { name, phone, address, typePayment, product } = data;
    const Product: any = [];
    let sum = 0;
    for (const item of product) {
      const price = await this.productModel.aggregate([
        { $match: { _id: new Types.ObjectId(item._id) } },
        { $unwind: "$price" },
        {
          $match: {
            "price.size": item.size,
            "price.style": item.style,
            "price.group": item.group,
          },
        },
        { $project: { price: 1 } },
      ]);
      if (price.length) {
        Product.push({
          product: item._id,
          size: item.size,
          style: item.style,
          group: item.group,
          price: price[0].price?.priceNew,
          quanlity: item.quanlity,
        });
        sum += price[0].price.priceNew * parseInt(item.quanlity);
      }
    }
    const today = new Date();
    const code =
      "HB-" + makeid(10) + today.toLocaleDateString().replaceAll("/", "");

    return this.bill.create({
      code,
      name,
      phone,
      Product,
      sumPrice: sum,
      accountId: user?._id,
      address: JSON.stringify(address),
      paymentType: typePayment,
      date: today,
    });
    return;
  }
}
