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
import { ClientService } from "./service";
import { DrugProduct } from "src/entities/types/product.entity";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";

@Controller("size-product")
@ApiBearerAuth()
@ApiTags("Size Product")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  // @Get()
  // async getForHome(@Body() createProductSize: CreateProductSizeDto) {
  //   return this.SizeService.create(createProductSize);
  // }

  @Get()
  async getForHome(): Promise<DrugProduct[]> {
    return this.clientService.findHome();
  }

  @Get(":id")
  async findDetail(@Param() { id }: ByID): Promise<DrugProduct> {
    return this.clientService.findDetail({ id });
  }

  // @Get(":id")
  // async update(
  //   @Param() { id }: ByID,
  //   @Body() updateDrugProduct: UpdateDrugProductDto,
  // ) {
  //   return this.SizeService.update({ id }, updateProductSize);
  // }

  // @Get(":id")
  // async remove(@Param() { id }: ByID) {
  //   return this.SizeService.remove({ id });
  // }

  // @Get(":code")
  // async checkCode(@Param() { code }: CodeParam) {
  //   return this.checkCode({ code });
  // }
}
