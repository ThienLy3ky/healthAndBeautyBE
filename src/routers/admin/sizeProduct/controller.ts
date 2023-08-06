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
import { ProductSizeService } from "./service";
import { ProductSize } from "src/entities/types/size.entity";
import { CreateProductSizeDto, GetAll, UpdateProductSizeDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("size-product")
@ApiBearerAuth()
@ApiTags("Size Product")
export class ProductSizeController {
  constructor(private readonly companyService: ProductSizeService) {}
  @Post()
  async create(@Body() createProductSize: CreateProductSizeDto) {
    return this.companyService.create(createProductSize);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<ProductSize[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<ProductSize> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param("id") { id }: ByID,
    @Body() updateProductSize: UpdateProductSizeDto,
  ) {
    return this.companyService.update({ id }, updateProductSize);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
