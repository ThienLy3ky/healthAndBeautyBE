import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CompanyService } from "./service";
import { Company } from "src/entities/types/compani.entity";
import { CreateCompanyDto, UpdateCompanyDto } from "./dto/dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
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
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.companyService.remove(id);
  }
}
