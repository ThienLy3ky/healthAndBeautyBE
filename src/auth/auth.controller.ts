import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { LoginBodyDTO } from "./dto/login.dto";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Body() req: LoginBodyDTO) {
    console.log(
      "🚀 ~ file: auth.controller.ts:20 ~ AuthController ~ login ~ req:",
      req,
    );
    return this.authService.login(req);
  }
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
