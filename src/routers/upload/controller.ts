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
import { UploadService } from "./service";
import { GetAll } from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("upload")
@ApiBearerAuth()
@ApiTags("Upload")
export class UploadController {
  constructor(private readonly companyService: UploadService) {}
  @Post()
  async uploadImage(/*@Body()*/) {
    return this.companyService.uploadImage();
  }

  @Get()
  async uploadImageAdmin(@Query() query: GetAll): Promise<any> {
    return this.companyService.uploadImageAdmin();
  }

  @Get(":id")
  async importFile(@Param("id") { id }: ByID): Promise<any> {
    return this.companyService.importFile();
  }

  @Put(":id")
  async exportFile(@Param("id") { id }: ByID, @Body() updateUpload: any) {
    return this.companyService.exportFile();
  }
}
