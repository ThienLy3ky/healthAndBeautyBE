import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Put,
} from "@nestjs/common";
import { BillService } from "./service";
import { Bill } from "src/entities/types/bill.entity";
import { GetAll, UpdateBillDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";

@Controller("bills")
@ApiBearerAuth()
@ApiTags("Bill")
export class BillController {
  constructor(private readonly companyService: BillService) {}

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<Bill>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<Bill> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(@Param("id") { id }: ByID, @Body() updateBill: UpdateBillDto) {
    return this.companyService.update({ id }, updateBill);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
