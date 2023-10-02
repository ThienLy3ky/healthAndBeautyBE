import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Put,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { BillService } from "./service";
import { Bill } from "src/entities/types/bill.entity";
import { CodeParame, GetAll, UpdateBillDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";
import { StatusBill } from "src/entities/enum/status.enum";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";

@Controller("bills")
@ApiBearerAuth()
@ApiTags("Bill")
@UseGuards(JwtAdminAuthGuard)
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

  @Patch("status/:id")
  async updateStatus(
    @Param() { id }: CodeParame,
    @Body() { status }: { status: StatusBill },
  ) {
    return this.companyService.updateStatus({ id }, status);
  }
  @Patch("payment/:id")
  async updatePayment(
    @Param() { id }: CodeParame,
    @Body() { status }: { status: boolean },
  ) {
    return this.companyService.updatePayment({ id }, status);
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
