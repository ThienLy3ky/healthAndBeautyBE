import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../routers/users/users.model";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport/dist";
import { AdminsModule } from "src/routers/admins/admins.module";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { RefreshTokenStrategy } from "./strategy/refresh-jwt.strategy";

@Module({
  imports: [
    AdminsModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
