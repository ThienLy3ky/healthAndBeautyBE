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
import { ApiBearerAuth } from "@nestjs/swagger";
import { RefreshTokenGuard } from "./guard/refresh-jwt.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req, @Body() body: LoginBodyDTO) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  refreshTokens(@Request() req: Request) {
    // const userId = req.user["sub"];
    // const refreshToken = req.user["refreshToken"];
    // return this.authService.refreshTokens(userId, refreshToken);
  }
}
