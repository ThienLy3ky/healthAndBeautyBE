import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from "@nestjs/common";
import { DrugProductService } from "./service";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, GetAll, UpdateDrugProductDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";

@Controller("product")
@ApiBearerAuth()
@ApiTags("product")
export class DrugProductController {
  constructor(private readonly companyService: DrugProductService) {}
  @Post()
  async create(@Body() createDrugProduct: CreateDrugProductDto) {
    return this.companyService.create(createDrugProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<DrugProduct>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<DrugProduct> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateDrugProduct: UpdateDrugProductDto,
  ) {
    return this.companyService.update({ id }, updateDrugProduct);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
