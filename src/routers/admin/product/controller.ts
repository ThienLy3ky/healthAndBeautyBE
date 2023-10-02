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
  UseGuards,
} from "@nestjs/common";
import { DrugProductService } from "./service";
import { DrugProduct } from "src/entities/types/product.entity";
import { CreateDrugProductDto, GetAll, UpdateDrugProductDto } from "./dto/dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { imageOptions } from "src/utils";
import { ByID, CodeParam, PaginationRes } from "src/interface/dto";
import { deleteFile } from "src/firebase";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";

@Controller("product")
@ApiBearerAuth()
@ApiTags("product")
@UseGuards(JwtAdminAuthGuard)
export class DrugProductController {
  constructor(private readonly productService: DrugProductService) {}

  @Post("/upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("images", 5, imageOptions))
  async uploadPr(@UploadedFiles() images: Express.Multer.File[]) {
    return this.productService.Upload(images);
  }

  @Post()
  async create(@Body() createDrugProduct: CreateDrugProductDto) {
    return this.productService.create(createDrugProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<DrugProduct>> {
    return this.productService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<DrugProduct> {
    return this.productService.findOne({ id });
  }
  @Put("/sale")
  async sale(
    @Body()
    updateDrugProduct: {
      ListSale: string[];
      dateSale: Date;
      PriceSale: number;
    },
  ) {
    return this.productService.Sale(updateDrugProduct);
  }
  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateDrugProduct: UpdateDrugProductDto,
  ) {
    return this.productService.update({ id }, updateDrugProduct);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.productService.remove({ id });
  }

  @Post("/check/:code")
  async checkCode(
    @Param() { code }: CodeParam,
    @Body() updateDrugProduct: UpdateDrugProductDto,
  ) {
    return this.productService.checkCode({ code });
  }

  @Post("/deletedFile")
  async delete(@Body() file: string[]) {
    return deleteFile(file);
  }
}
