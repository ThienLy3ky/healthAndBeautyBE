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
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";

@Controller("size-product")
@ApiBearerAuth()
@ApiTags("Size Product")
export class ProductSizeController {
  constructor(private readonly SizeService: ProductSizeService) {}
  @Post()
  async create(@Body() createProductSize: CreateProductSizeDto) {
    return this.SizeService.create(createProductSize);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<ProductSize>> {
    return this.SizeService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<ProductSize> {
    return this.SizeService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateProductSize: UpdateProductSizeDto,
  ) {
    return this.SizeService.update({ id }, updateProductSize);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.SizeService.remove({ id });
  }

  @Get(":code")
  async checkCode(@Param() { code }: CodeParam) {
    return this.checkCode({ code });
  }
}
