import { Body, Controller, Get, Param, Post, Query, Put } from "@nestjs/common";
import { ClientService } from "./service";
import { DrugProduct } from "src/entities/types/product.entity";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { GetAll } from "./dto/dto";

@Controller("Client")
@ApiBearerAuth()
@ApiTags("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Get("search")
  async getSearch(@Query() query: GetAll) {
    return this.clientService.getSearch(query);
  }

  @Get()
  async getForHome() {
    return this.clientService.findHome();
  }

  @Get(":code")
  async findDetail(@Param() { code }: CodeParam): Promise<DrugProduct> {
    return this.clientService.findDetail({ code });
  }

  @Post()
  async payment(@Body() payload: any) {
    return;
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
