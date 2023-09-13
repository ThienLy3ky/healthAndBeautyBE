import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ClientService } from "./service";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CodeParam } from "src/interface/dto";
import { GetAll } from "./dto/dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { User } from "src/decorators/admin.decorator";

@Controller("Client")
@ApiBearerAuth()
@ApiTags("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Get("search")
  async getSearch(@Query() query: GetAll) {
    return this.clientService.getSearch(query);
  }

  @Get()
  async getForHome() {
    return this.clientService.findHome();
  }

  @Get(":code")
  async findDetail(@Param() { code }: CodeParam) {
    return this.clientService.findDetail({ code });
  }

  @Post("payment")
  @UseGuards(JwtAuthGuard)
  async payment(@User() user: any, @Body() payload: any) {
    return this.clientService.payment(user, payload);
  }
  // @Get(":id")
  // async update(
  //   @Param() { id }: ByID,
  //   @Body() updateDrugProduct: UpdateDrugProductDto,
  // ) {
  //   return this.SizeService.update({ id }, updateProductSize);
  // }

  // @Get(":id")
  // async remove(@Param() { id }: ByID) {
  //   return this.SizeService.remove({ id });
  // }

  // @Get(":code")
  // async checkCode(@Param() { code }: CodeParam) {
  //   return this.checkCode({ code });
  // }
}
