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
  Put,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UsersService } from "./users.service";
import { StatusBill } from "src/entities/enum/status.enum";
import { User } from "src/decorators/admin.decorator";
import { AddAddress, CancelOrder, ChangePass, UpdateProfile } from "./dto";

@Controller("user")
export class UserController {
  constructor(private userService: UsersService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(@User() user: any, @Body() body: UpdateProfile) {
    return this.userService.updateProfile(body, user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("/change-passwork")
  changePassword(@User() user: any, @Body() body: ChangePass) {
    return this.userService.ChangePass(body, user);
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
  addAddress(@Body() { addAddress }: AddAddress, @User() user: any) {
    return this.userService.addAddress(user, addAddress);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/cancel")
  orderCancel(@Body() { code }: CancelOrder, @User() user: any) {
    return this.userService.cancelOrder(code, user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/code")
  getListCode(@Request() req) {
    return req.user;
  }
}
