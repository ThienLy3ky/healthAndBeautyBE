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
  Req,
  Param,
} from "@nestjs/common";
import { LoginBodyDTO } from "./dto/login.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RefreshTokenGuard } from "./guard/refresh-jwt.guard";
import { RegisterBodyDTO, signupBodyDTO, verifyCode } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
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
  @Post("refresh-token")
  refreshTokens(@Request() req: any) {
    return this.authService.refreshtoken(req.user.sub, req.user.refreshToken);
  }

  @Post("admin")
  createAdmin(@Body() payload: RegisterBodyDTO) {
    return this.authService.createAdmin(payload);
  }

  @Post("signup")
  signup(@Body() payload: signupBodyDTO) {
    return this.authService.signUp(payload);
  }

  @Post("verify")
  verifyCode(@Body() payload: verifyCode) {
    return this.authService.verifyCode(payload);
  }

  @Post("resend/:email")
  reSendCode(@Param("email") email: string) {
    return this.authService.reSendCode(email);
  }

  @Get("google")
  // @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    return;
  }
  @Get("redirect")
  // @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
