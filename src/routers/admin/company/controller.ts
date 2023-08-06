import {
  Body,
  Controller,
  Delete,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Post,
  BadRequestException,
  Put,
} from "@nestjs/common";
import { CompanyService } from "./service";
import { Company } from "src/entities/types/companies.entity";
import { CreateCompanyDto, UpdateCompanyDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("company")
@ApiBearerAuth()
@ApiTags("Company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async create(@Body() createCompany: CreateCompanyDto) {
    try {
      return this.companyService.create(createCompany);
    } catch (error) {
      console.log(
        "🚀 ~ file: service.ts:19 ~ CompanyService ~ create ~ error:",
        error,
      );
      throw new BadRequestException("error");
    }
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCompany: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompany);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.companyService.remove(id);
  }
}
