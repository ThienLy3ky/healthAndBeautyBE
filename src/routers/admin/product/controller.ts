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
  UploadedFiles,
} from "@nestjs/common";
import { DrugProductService } from "./service";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, GetAll, UpdateDrugProductDto } from "./dto/dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { uploadFile } from "src/firebase";
import { imageOptions } from "src/utils";
import { ByID, PaginationRes } from "src/interface/dto";

@Controller("product")
@ApiBearerAuth()
@ApiTags("product")
export class DrugProductController {
  constructor(private readonly companyService: DrugProductService) {}

  @Post("/upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("images", 1, imageOptions))
  async uploadPr(@UploadedFiles() images: Express.Multer.File[]) {
    if (images.length > 0) {
      return await uploadFile(images[0].path);
    }
  }

  @Post()
  async create(@Body() createDrugProduct: CreateDrugProductDto) {
    return this.companyService.create(createDrugProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<DrugProduct>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<DrugProduct> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateDrugProduct: UpdateDrugProductDto,
  ) {
    return this.companyService.update({ id }, updateDrugProduct);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
