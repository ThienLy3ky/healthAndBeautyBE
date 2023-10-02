import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CodeSaleService } from "./service";
import { CodeSale } from "src/entities/types/codeSale.entity";
import { CreateCodeSaleDto, GetAll, UpdateCodeSaleDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";

@Controller("sale-code")
@ApiBearerAuth()
@ApiTags("Code Sale")
@UseGuards(JwtAdminAuthGuard)
export class CodeSaleController {
  constructor(private readonly companyService: CodeSaleService) {}
  @Post()
  async create(@Body() createCodeSale: CreateCodeSaleDto) {
    return this.companyService.create(createCodeSale);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<CodeSale[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<CodeSale> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param("id") { id }: ByID,
    @Body() updateCodeSale: UpdateCodeSaleDto,
  ) {
    return this.companyService.update({ id }, updateCodeSale);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
