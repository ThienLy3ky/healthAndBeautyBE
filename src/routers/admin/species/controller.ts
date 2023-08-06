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
import { SpeciesProductService } from "./service";
import { SpeciesProduct } from "src/entities/types/species.entity";
import {
  CreateSpeciesProductDto,
  GetAll,
  UpdateSpeciesProductDto,
} from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("species-product")
@ApiBearerAuth()
@ApiTags("Speccies")
export class SpeciesProductController {
  constructor(private readonly companyService: SpeciesProductService) {}
  @Post()
  async create(@Body() createSpeciesProduct: CreateSpeciesProductDto) {
    return this.companyService.create(createSpeciesProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<SpeciesProduct[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<SpeciesProduct> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param("id") { id }: ByID,
    @Body() updateSpeciesProduct: UpdateSpeciesProductDto,
  ) {
    return this.companyService.update({ id }, updateSpeciesProduct);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
