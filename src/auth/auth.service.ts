import { ConfigService } from "@nestjs/config";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../routers/users/users.service";
import { AdminsService } from "src/routers/admins/admins.service";
import { hashSync, compareSync } from "bcrypt";
import { ObjectId } from "mongoose";
import { RegisterBodyDTO, signupBodyDTO, verifyCode } from "./dto/register.dto";
import { MailingService } from "src/mailing/mailing.service";
import { generatecode, makeid } from "src/utils";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private AdminService: AdminsService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailingService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const admin = await this.AdminService.findByEmail(email);
    if (admin) {
      const password_hash_admin = compareSync(password, admin.password_hash);
      if (password_hash_admin) {
        const { email, isActive, _id } = admin;
        return { role: "admin", email, isActive, _id };
      }
    }
    const user = await this.usersService.findByEmail(email);
    if (user.isActive !== true) return {};
    if (user) {
      const password_hash_user = compareSync(password, user.password_hash);
      if (password_hash_user) {
        const { email, isActive, _id } = user;
        return { role: "user", email, isActive, _id };
      }
    }
    return null;
  }
  async login(user: any) {
    if (!user.email) return {};
    const payload = {
      username: user.email,
      sub: { role: user.role, user: user.email },
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user._id, tokens.refreshToken, user.role);
    return {
      access_token: tokens,
      role: user.role,
    };
  }
  async getTokens({ username, sub }: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub,
          username,
        },
        {
          secret: this.configService.get("keys").jwt_secret,
          expiresIn: "1h",
        },
      ),
      this.jwtService.signAsync(
        {
          sub,
          username,
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

  async logout(userId: ObjectId, role: string) {
    if (role === "admin") {
      this.AdminService.updateToken(userId, null);
      return;
    }
    return this.usersService.updateToken(userId, null);
  }

  hashData(data: string) {
    return hashSync(data, 10);
  }

  async signUp(createUserDto: signupBodyDTO): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findOne(createUserDto.emailSG);
    if (userExists) {
      throw new BadRequestException("Email already exists");
    }

    // Hash password
    const hash = await this.hashData(createUserDto.passwordSG);
    //validate emaill none
    const exprice = new Date(
      new Date().setUTCMinutes(new Date().getUTCMinutes() + 10),
    );
    const code = generatecode(5);
    const user = await this.usersService.create({
      email: createUserDto.emailSG,
      password_hash: hash,
      userName: createUserDto.userName,
      codeVerify: code,
      expVerify: exprice,
    });
    await this.mailService.sendMail({ to: user?.email, code, user });
    return user;
  }
  async createAdmin({ email, password }: RegisterBodyDTO) {
    const password_hash = this.hashData(password);
    return this.AdminService.create({ email, password_hash });
  }

  async getProfile(data: any) {
    return await this.usersService.getProfile(data.user);
  }
  async refreshtoken(
    { user, role }: { user: string; role: string },
    refreshToken: string,
  ) {
    let account: any = {};
    if (role == "admin") {
      account = await this.AdminService.findByEmail(user);
    } else {
      account = await this.usersService.findByEmail(user);
    }
    if (account.isActive !== true) return "Not Acitve";
    const check = compareSync(refreshToken, account.refreshToken);
    if (check) {
      const payload = {
        username: account.username ?? account.email,
        sub: { role: role, user: account.email },
      };
      const tokens = await this.getTokens(payload);
      await this.updateRefreshToken(
        account._id,
        tokens.refreshToken,
        account.role,
      );
      return tokens.accessToken;
    }
    throw new UnauthorizedException();
  }

  async googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }
    console.log(req.user);
    return {
      message: "User information from google",
      user: req.user,
    };
  }

  async verifyCode({ email, code }: verifyCode) {
    const today = new Date();
    const user = await this.usersService.findByEmail(email);
    if (user.isActive === true) return true;
    if (user.codeVerify !== code || today > user.expVerify)
      throw new BadRequestException("Mã code hết hạn");
    const da = await this.usersService.activeUser(user._id);
    return da ? true : false;
  }
  async reSendCode(email: string): Promise<any> {
    const today = new Date();
    const userExists = await this.usersService.findByEmail(email);
    if (!userExists) {
      throw new BadRequestException("Email already exists");
    }
    if (today < userExists.expVerify)
      return {
        exp: userExists.expVerify,
        message:
          "Ban vui long cho sau " +
          (userExists.expVerify.getUTCMinutes() - today.getUTCMinutes()),
      };
    const exprice = new Date(today.setUTCMinutes(today.getUTCMinutes() + 10));
    const code = generatecode(5);
    await this.mailService.sendMail({
      to: userExists?.email,
      code,
      user: userExists,
    });
    await this.usersService.updateCode(userExists._id, code, exprice);
    return { exp: exprice, email };
  }
}
