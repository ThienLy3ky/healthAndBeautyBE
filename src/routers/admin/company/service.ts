import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company } from "src/entities/types/compani.entity";
// import { CreateCompanyDto } from "./create-company.dto";
// import { UpdateCompanyDto } from "./update-company.dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: any): Promise<Company> {
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Company> {
    return this.companyModel.findById(id).lean().exec();
  }

  async update(id: string, updateCompanyDto: any): Promise<Company> {
    return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Company> {
    return this.companyModel.findByIdAndDelete(id);
  }
}
