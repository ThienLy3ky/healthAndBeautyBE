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
    const admin = await this.AdminService.findByEmail(email);
    if (admin && admin.password_hash === password) {
      const { email, isActive } = admin;
      return { role: "admin", email, isActive };
    }
    const user = await this.usersService.findByEmail(email);
    if (user && user.password_hash === password) {
      const { email, isActive } = user;

      return { role: "admin", email, isActive };
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          // secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "15m",
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          // secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    // const hashedRefreshToken = await this.hashData(refreshToken);
    // await this.usersService.update(userId, {
    //   refreshToken: hashedRefreshToken,
    // });
  }
  // async signIn(data: AuthDto) {
  //   // Check if user exists
  //   const user = await this.usersService.findByUsername(data.username);
  //   if (!user) throw new BadRequestException("User does not exist");
  //   const passwordMatches = await argon2.verify(user.password, data.password);
  //   if (!passwordMatches)
  //     throw new BadRequestException("Password is incorrect");
  //   const tokens = await this.getTokens(user._id, user.username);
  //   await this.updateRefreshToken(user._id, tokens.refreshToken);
  //   return tokens;
  // }

  // async logout(userId: string) {
  //   return this.usersService.update(userId, { refreshToken: null });
  // }

  // hashData(data: string) {
  //   return argon2.hash(data);
  // }

  // async signUp(createUserDto: CreateUserDto): Promise<any> {
  //   // Check if user exists
  //   const userExists = await this.usersService.findByUsername(
  //     createUserDto.username,
  //   );
  //   if (userExists) {
  //     throw new BadRequestException("User already exists");
  //   }

  //   // Hash password
  //   const hash = await this.hashData(createUserDto.password);
  //   const newUser = await this.usersService.create({
  //     ...createUserDto,
  //     password: hash,
  //   });
  //   const tokens = await this.getTokens(newUser._id, newUser.username);
  //   await this.updateRefreshToken(newUser._id, tokens.refreshToken);
  //   return tokens;
  // }
}
