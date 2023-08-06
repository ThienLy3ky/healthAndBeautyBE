import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bill } from "src/entities/types/bill.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

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

  async findAll(query: GetAll): Promise<Bill[]> {
    return this.productTypeModel.find().lean().exec();
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
