import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bill } from "src/entities/types/bill.entity";
import { GetAll } from "./dto/dto";
import { ByID, PaginationRes } from "src/interface/dto";
import { populatedAll, populatedAllPagination } from "src/utils";

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name)
    private readonly productTypeModel: Model<Bill>,
  ) {}

  async create(createBillDto: any): Promise<Bill> {
    const newBill = new this.productTypeModel(createBillDto);
    return newBill.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<Bill>> {
    const field = { _id: 1, name: 1 };
    const { limit, page, key, order, orderBy } = query;
    const populateArr = {
        path: "Product",
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
        path: "accountId",
        select: field,
      };
    const { items, total } =
      limit && limit > 0
        ? await populatedAllPagination(
            this.productTypeModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
            populateArr,
            populateObj,
          )
        : await populatedAll(
            this.productTypeModel,
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

  async findOne({ id }: ByID): Promise<Bill> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateBillDto: any): Promise<Bill> {
    return this.productTypeModel.findByIdAndUpdate(id, updateBillDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<Bill> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
