import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GroupProduct } from "src/entities/types/group.entity";
import {
  CreateGroupProductDto,
  GetAll,
  UpdateGroupProductDto,
} from "./dto/dto";
import { ByID, PaginationRes } from "src/interface/dto";
import { FindAll, FindAllPagination, checkExit } from "src/utils";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class GroupProductService {
  constructor(
    @InjectModel(GroupProduct.name)
    private readonly groupProductModel: Model<GroupProduct>,
  ) {}

  async create(payload: CreateGroupProductDto): Promise<GroupProduct> {
    const { code } = payload;
    const isExit = await checkExit(this.groupProductModel, {
      code: code,
    });
    if (isExit) throw new BadRequestException("data wrong");
    const newGroupProduct = new this.groupProductModel(payload);
    return newGroupProduct.save();
  }

  async findAll(query: GetAll): Promise<PaginationRes<GroupProduct>> {
    const { limit, page, key, order, orderBy } = query;
    const { items, total } =
      limit && limit > 0
        ? await FindAllPagination(
            this.groupProductModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { limit, page, order, orderBy },
          )
        : await FindAll(
            this.groupProductModel,
            key ? { name: { $regex: key, $options: "i" } } : {},
            { order, orderBy },
          );
    return {
      items,
      page,
      limit,
      total,
      totalPages: 1,
    };
  }

  async findOne({ id }: ByID): Promise<GroupProduct> {
    return this.groupProductModel.findById(id).lean().exec();
  }

  async update(
    { id }: ByID,
    payload: UpdateGroupProductDto,
  ): Promise<GroupProduct> {
    const { code } = payload;
    const isExit = await checkExit(this.groupProductModel, {
      _id: id,
    });
    const checkCode = await checkExit(this.groupProductModel, {
      _id: { $ne: id },
      code: code,
    });
    if (!isExit || checkCode) throw new BadRequestException("data wrong");
    return this.groupProductModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async remove({ id }: ByID): Promise<GroupProduct> {
    return this.groupProductModel.findByIdAndDelete(id);
  }
}
