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
import { BannerService } from "./service";
import { Banner } from "src/entities/types/banner.entity";
import { CreateBannerDto, GetAll, UpdateBannerDto } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("banner")
@ApiBearerAuth()
@ApiTags("Banner")
export class BannerController {
  constructor(private readonly companyService: BannerService) {}
  @Post()
  async create(@Body() createBanner: CreateBannerDto) {
    return this.companyService.create(createBanner);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<Banner[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<Banner> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param("id") { id }: ByID,
    @Body() updateBanner: UpdateBannerDto,
  ) {
    return this.companyService.update({ id }, updateBanner);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
