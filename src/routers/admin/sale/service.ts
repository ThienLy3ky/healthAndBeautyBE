import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Sale } from "src/entities/types/sale.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name)
    private readonly productTypeModel: Model<Sale>,
  ) {}

  async create(createSaleDto: any): Promise<Sale> {
    const newSale = new this.productTypeModel(createSaleDto);
    return newSale.save();
  }

  async findAll(query: GetAll): Promise<Sale[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<Sale> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateSaleDto: any): Promise<Sale> {
    return this.productTypeModel.findByIdAndUpdate(id, updateSaleDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<Sale> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
