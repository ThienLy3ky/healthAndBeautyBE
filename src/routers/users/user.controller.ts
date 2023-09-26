import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Param,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UsersService } from "./users.service";
import { StatusBill } from "src/entities/enum/status.enum";
import { User } from "src/decorators/admin.decorator";

@Controller("user")
export class UserController {
  constructor(private userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post()
  async updateProfile(@Request() req, @Body() body) {
    return;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/order")
  getAllOrder(@Query() { status }: { status?: StatusBill }, @User() user: any) {
    return this.userService.getListOrder(user, status);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/address")
  addAddress(
    @Body() { addAddress }: { addAddress?: string },
    @User() user: any,
  ) {
    return this.userService.addAddress(user, addAddress);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/cancel")
  orderCancel(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/code")
  getListCode(@Request() req) {
    return req.user;
  }
}
