import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { BannerService } from "./service";
import { Banner } from "src/entities/types/banner.entity";
import { CreateBannerDto, GetAll, UpdateBannerDto } from "./dto/dto";

import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageOptions } from "src/utils";
import { uploadFile } from "src/firebase";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";

@Controller("banner")
@ApiBearerAuth()
@ApiTags("Banner")
@UseGuards(JwtAdminAuthGuard)
export class BannerController {
  constructor(private readonly companyService: BannerService) {}
  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("images", imageOptions))
  async create(
    @Body() createBanner: CreateBannerDto,
    @UploadedFile() images: Express.Multer.File,
  ) {
    if (images) {
      const fileurl = await uploadFile(images.path);
      createBanner.image = fileurl.toString();
    }
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
