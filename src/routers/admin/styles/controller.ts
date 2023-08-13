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
import { StyleProductService } from "./service";
import { StyleProduct } from "src/entities/types/style.entity";
import {
  CreateStyleProductDto,
  GetAll,
  UpdateStyleProductDto,
} from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("style-product")
@ApiBearerAuth()
@ApiTags("styles")
export class StyleProductController {
  constructor(private readonly companyService: StyleProductService) {}
  @Post()
  async create(@Body() createStyleProduct: CreateStyleProductDto) {
    return this.companyService.create(createStyleProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<StyleProduct[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<StyleProduct> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateStyleProduct: UpdateStyleProductDto,
  ) {
    return this.companyService.update({ id }, updateStyleProduct);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
