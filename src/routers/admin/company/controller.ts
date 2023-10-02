import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CompanyService } from "./service";
import { Company } from "src/entities/types/companies.entity";
import { CreateCompanyDto, GetAll, UpdateCompanyDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";

@Controller("company")
@ApiBearerAuth()
@ApiTags("Company")
@UseGuards(JwtAdminAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async create(@Body() createCompany: CreateCompanyDto) {
    return this.companyService.create(createCompany);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<Company>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<Company> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(@Param() { id }: ByID, @Body() updateCompany: UpdateCompanyDto) {
    return this.companyService.update({ id }, updateCompany);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
