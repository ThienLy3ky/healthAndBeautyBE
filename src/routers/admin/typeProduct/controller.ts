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
import { ProductTypeService } from "./service";
import { ProductType } from "src/entities/types/type.entity";
import { CreateProductTypeDto, GetAll, UpdateProductTypeDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";

@Controller("type-product")
@ApiBearerAuth()
@ApiTags("Type Product")
export class ProductTypeController {
  constructor(private readonly companyService: ProductTypeService) {}
  @Post()
  async create(@Body() createProductType: CreateProductTypeDto) {
    return this.companyService.create(createProductType);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<ProductType>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<ProductType> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateProductType: UpdateProductTypeDto,
  ) {
    return this.companyService.update({ id }, updateProductType);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
