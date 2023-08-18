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
import { ProductTypeService } from "./service";
import { ProductType } from "src/entities/types/type.entity";
import { CreateProductTypeDto, GetAll, UpdateProductTypeDto } from "./dto/dto";
import { Express } from "express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";
import { diskStorage } from "multer";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/)))
    callback(null, false);
  callback(null, true);
};

export const imageOptions: MulterOptions = {
  limits: { fileSize: 5242880 },
  fileFilter: imageFilter,
  dest: "upload/",
  // storage: diskStorage({
  //   destination: "./uploads",
  //   filename: (req, file, cb) => {
  //     // Generating a 32 random chars long string
  //     // const randomName = Array(32)
  //     //   .fill(null)
  //     //   .map(() => Math.round(Math.random() * 16).toString(16))
  //     //   .join("");
  //     // //Calling the callback passing the random name generated with the original extension name
  //     // cb(null, `${randomName}${extname(file.originalname)}`);
  //   },
  // }),
};

@Controller("type-product")
@ApiBearerAuth()
@ApiTags("Type Product")
export class ProductTypeController {
  constructor(private readonly companyService: ProductTypeService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("images", 5, imageOptions))
  async create(
    @Body() createProductType: CreateProductTypeDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    console.log(
      "🚀 ~ file: controller.ts:50 ~ ProductTypeController ~ file:",
      images,
    );
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
  async update(
    @Param() { id }: ByID,
    @Body() updateProductType: UpdateProductTypeDto,
  ) {
    return this.companyService.update({ id }, updateProductType);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
