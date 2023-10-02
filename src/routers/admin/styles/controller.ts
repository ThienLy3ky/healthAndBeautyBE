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
import { StyleProductService } from "./service";
import { StyleProduct } from "src/entities/types/style.entity";
import {
  CreateStyleProductDto,
  GetAll,
  UpdateStyleProductDto,
} from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";

@Controller("style-product")
@ApiBearerAuth()
@ApiTags("styles")
@UseGuards(JwtAdminAuthGuard)
export class StyleProductController {
  constructor(private readonly StyleService: StyleProductService) {}
  @Post()
  async create(@Body() createStyleProduct: CreateStyleProductDto) {
    return this.StyleService.create(createStyleProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<StyleProduct>> {
    return this.StyleService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<StyleProduct> {
    return this.StyleService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateStyleProduct: UpdateStyleProductDto,
  ) {
    return this.StyleService.update({ id }, updateStyleProduct);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.StyleService.remove({ id });
  }

  @Get(":code")
  async checkCode(@Param() { code }: CodeParam) {
    return this.checkCode({ code });
  }
}
