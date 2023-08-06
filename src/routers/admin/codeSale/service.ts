import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CodeSale } from "src/entities/types/codeSale.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class CodeSaleService {
  constructor(
    @InjectModel(CodeSale.name)
    private readonly productTypeModel: Model<CodeSale>,
  ) {}

  async create(createCodeSaleDto: any): Promise<CodeSale> {
    const newCodeSale = new this.productTypeModel(createCodeSaleDto);
    return newCodeSale.save();
  }

  async findAll(query: GetAll): Promise<CodeSale[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<CodeSale> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, updateCodeSaleDto: any): Promise<CodeSale> {
    return this.productTypeModel.findByIdAndUpdate(id, updateCodeSaleDto, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<CodeSale> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
