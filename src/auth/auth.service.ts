import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../routers/users/users.service";
import { AdminsService } from "src/routers/admins/admins.service";
import { LoginBodyDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private AdminService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const user = await this.AdminService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: LoginBodyDTO) {
    const data = await this.validateUser(user);
    const payload = { username: user.email, sub: user.password };
    return {
      access_token: this.jwtService.sign(data),
    };
  }
}
