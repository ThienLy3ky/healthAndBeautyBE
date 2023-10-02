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
import { GroupProductService } from "./service";
import { GroupProduct } from "src/entities/types/group.entity";
import {
  CreateGroupProductDto,
  GetAll,
  UpdateGroupProductDto,
} from "./dto/dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ByID, PaginationRes } from "src/interface/dto";
import { JwtAdminAuthGuard } from "src/auth/guard/jwt-admin-auth.guard";
@Controller("group-product")
@ApiBearerAuth()
@ApiTags("Group Products")
@UseGuards(JwtAdminAuthGuard)
export class GroupProductController {
  constructor(private readonly companyService: GroupProductService) {}
  @Post()
  async create(@Body() createGroupProduct: CreateGroupProductDto) {
    return this.companyService.create(createGroupProduct);
  }

  @Get()
  async findAll(@Query() query: GetAll): Promise<PaginationRes<GroupProduct>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param() { id }: ByID): Promise<GroupProduct> {
    return this.companyService.findOne({ id });
  }

  @Put(":id")
  async update(
    @Param() { id }: ByID,
    @Body() updateGroupProduct: UpdateGroupProductDto,
  ) {
    return this.companyService.update({ id }, updateGroupProduct);
  }

  @Delete(":id")
  async remove(@Param() { id }: ByID) {
    return this.companyService.remove({ id });
  }
}
