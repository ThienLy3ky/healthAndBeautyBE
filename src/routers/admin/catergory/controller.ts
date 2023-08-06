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
import { CategoryService } from "./service";
import { Category } from "src/entities/types/categories.entity";
import { CreateCategoryDto, GetAll, UpdateCategoryDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("categories")
@ApiBearerAuth()
@ApiTags("categories")
export class CategoryController {
  constructor(private readonly companyService: CategoryService) {}
  @Post()
  async create(@Body() createCategory: CreateCategoryDto) {
    return this.companyService.create(createCategory);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<Category[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<Category> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param("id") { id }: ByID,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return this.companyService.update({ id }, updateCategory);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
