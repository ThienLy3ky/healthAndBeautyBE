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
} from "@nestjs/common";
import { ProductTypeService } from "./service";
import { ProductType } from "src/entities/types/type.entity";
import { CreateProductTypeDto, GetAll, UpdateProductTypeDto } from "./dto/dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadFile } from "src/firebase";
import { imageOptions } from "src/utils";

@Controller("type-product")
@ApiBearerAuth()
@ApiTags("Type Product")
export class ProductTypeController {
  constructor(private readonly companyService: ProductTypeService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("images", imageOptions))
  async create(
    @Body() createProductType: CreateProductTypeDto,
    @UploadedFile() images: Express.Multer.File,
  ) {
    if (images) {
      const fileurl = await uploadFile(images.path);
      createProductType.image = fileurl.toString();
    }
    return this.companyService.create(createProductType);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<ProductType>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<ProductType> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("images", imageOptions))
  async update(
    @Param() { id }: ByID,
    @Body() updateProductType: UpdateProductTypeDto,
    @UploadedFile() images: Express.Multer.File,
  ) {
    if (images) {
      const fileurl = await uploadFile(images.path);
      updateProductType.image = fileurl.toString();
    }
    return this.companyService.update({ id }, updateProductType);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
