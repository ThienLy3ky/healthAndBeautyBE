import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company } from "src/entities/types/companies.entity";
import { ByID, PaginationRes } from "src/interface/dto";
import { FindAll, FindAllPagination, checkExit } from "src/utils";
import { CreateCompanyDto, GetAll, UpdateCompanyDto } from "./dto/dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  async create(payload: CreateCompanyDto): Promise<Company> {
    const { code } = payload;
    const isExit = await checkExit(this.companyModel, {
      code: code,
    });
    if (isExit) throw new BadRequestException("data wrong");
    const newCompany = new this.companyModel(payload);
    return newCompany.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<Company>> {
    const { limit, page, key, order, orderBy } = query;
    const { items, total } =
      limit && limit > 0
        ? await FindAllPagination(
            this.companyModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
          )
        : await FindAll(
            this.companyModel,
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

  async findOne(id: ByID): Promise<Company> {
    return this.companyModel.findById(id).lean().exec();
  }

  async update({ id }: ByID, payload: UpdateCompanyDto): Promise<Company> {
    const isExit = await checkExit(this.companyModel, {
      _id: id,
    });
    if (!isExit) throw new BadRequestException("data wrong");
    return this.companyModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async remove(id: ByID): Promise<Company> {
    return this.companyModel.findByIdAndDelete(id);
  }
}
