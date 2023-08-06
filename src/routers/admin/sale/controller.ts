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
import { SaleService } from "./service";
import { Sale } from "src/entities/types/sale.entity";
import { CreateSaleDto, GetAll, UpdateSaleDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("sale-product")
@ApiBearerAuth()
@ApiTags("Flash sale")
export class SaleController {
  constructor(private readonly companyService: SaleService) {}
  @Post()
  async create(@Body() createSale: CreateSaleDto) {
    return this.companyService.create(createSale);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<Sale[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<Sale> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(@Param("id") { id }: ByID, @Body() updateSale: UpdateSaleDto) {
    return this.companyService.update({ id }, updateSale);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
