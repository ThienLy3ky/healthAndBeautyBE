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
import { GroupProductService } from "./service";
import { GroupProduct } from "src/entities/types/group.entity";
import {
  CreateGroupProductDto,
  GetAll,
  UpdateGroupProductDto,
} from "./dto/dto";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID } from "src/interface/dto";

@Controller("group-product")
@ApiBearerAuth()
@ApiTags("Group Products")
export class GroupProductController {
  constructor(private readonly companyService: GroupProductService) {}
  @Post()
  async create(@Body() createGroupProduct: CreateGroupProductDto) {
    return this.companyService.create(createGroupProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<GroupProduct[]> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") { id }: ByID): Promise<GroupProduct> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param("id") { id }: ByID,
    @Body() updateGroupProduct: UpdateGroupProductDto,
  ) {
    return this.companyService.update({ id }, updateGroupProduct);
  }

  @Delete(":id")
  async remove(@Param("id") { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
