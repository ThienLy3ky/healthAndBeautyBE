import { ConfigService } from "@nestjs/config";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../routers/users/users.service";
import { AdminsService } from "src/routers/admins/admins.service";
import { LoginBodyDTO } from "./dto/login.dto";
import { hashSync, compareSync } from "bcrypt";
import { ObjectId } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private AdminService: AdminsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const admin = await this.AdminService.findByEmail(email);
    if (admin && admin.password_hash === password) {
      const { email, isActive, _id } = admin;
      return { role: "admin", email, isActive, _id };
    }
    const user = await this.usersService.findByEmail(email);
    if (user && user.password_hash === password) {
      const { email, isActive, _id } = user;
      return { role: "admin", email, isActive, _id };
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.role };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user._id, tokens.refreshToken, user.role);
    return tokens;
    return {
      access_token: tokens,
      role: user.role,
    };
  }
  async getTokens({ email, sub }: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub,
          email,
        },
        {
          secret: this.configService.get("keys").jwt_secret,
          expiresIn: "1h",
        },
      ),
      this.jwtService.signAsync(
        {
          sub,
          email,
        },
        {
          secret: this.configService.get("keys").refresh_secrest,
          expiresIn: "7d",
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: ObjectId, refreshToken: string, role) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    if (role === "admin") {
      this.AdminService.updateToken(userId, hashedRefreshToken);
      return;
    }
    this.usersService.updateToken(userId, hashedRefreshToken);
  }

  async logout(userId: ObjectId,role:string) {
     if (role === "admin") {
       this.AdminService.updateToken(userId, null);
       return;
     }
     return this.usersService.updateToken(userId, null);
  }

  hashData(data: string) {
    return hashSync(data, 10);
  }

  async signUp(createUserDto: any): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException("Email already exists");
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      email: createUserDto.email,
      password_hash: hash,
    });
    return;
  }
}
