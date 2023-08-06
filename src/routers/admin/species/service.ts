import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SpeciesProduct } from "src/entities/types/species.entity";
import { GetAll } from "./dto/dto";
import { ByID } from "src/interface/dto";

@Injectable()
export class SpeciesProductService {
  constructor(
    @InjectModel(SpeciesProduct.name)
    private readonly productTypeModel: Model<SpeciesProduct>,
  ) {}

  async create(createSpeciesProductDto: any): Promise<SpeciesProduct> {
    const newSpeciesProduct = new this.productTypeModel(
      createSpeciesProductDto,
    );
    return newSpeciesProduct.save();
  }

  async findAll(query: GetAll): Promise<SpeciesProduct[]> {
    return this.productTypeModel.find().lean().exec();
  }

  async findOne({ id }: ByID): Promise<SpeciesProduct> {
    return this.productTypeModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    updateSpeciesProductDto: any,
  ): Promise<SpeciesProduct> {
    return this.productTypeModel.findByIdAndUpdate(
      id,
      updateSpeciesProductDto,
      {
        new: true,
      },
    );
  }

  async remove({ id }: ByID): Promise<SpeciesProduct> {
    return this.productTypeModel.findByIdAndDelete(id);
  }
}
