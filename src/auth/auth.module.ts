import { jwtConstants } from "./constants/constants";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../routers/users/users.model";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport/dist";
import { AdminsModule } from "src/routers/admins/admins.module";

@Module({
  imports: [
    AdminsModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60m" },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
