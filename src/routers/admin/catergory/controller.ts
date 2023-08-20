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
  UploadedFile,
} from "@nestjs/common";
import { CategoryService } from "./service";
import { Category } from "src/entities/types/categories.entity";
import { CreateCategoryDto, GetAll, UpdateCategoryDto } from "./dto/dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadFile } from "src/firebase";
import { imageOptions } from "src/utils";
import { ByID, PaginationRes } from "src/interface/dto";

@Controller("categories")
@ApiBearerAuth()
@ApiTags("categories")
export class CategoryController {
  constructor(private readonly companyService: CategoryService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("images", imageOptions))
  async create(
    @Body() createCategory: CreateCategoryDto,
    @UploadedFile() images: Express.Multer.File,
  ) {
    if (images) {
      const fileurl = await uploadFile(images.path);
      createCategory.image = fileurl.toString();
    }
    return this.companyService.create(createCategory);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<Category>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<Category> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("images", imageOptions))
  async update(
    @Param() { id }: ByID,
    @Body() updateCategory: UpdateCategoryDto,
    @UploadedFile() images: Express.Multer.File,
  ) {
    if (images) {
      const fileurl = await uploadFile(images.path);
      updateCategory.image = fileurl.toString();
    }
    return this.companyService.update({ id }, updateCategory);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
