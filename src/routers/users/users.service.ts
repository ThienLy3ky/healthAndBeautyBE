import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Admin } from "src/entities/types/admin.entity";
import { Account } from "src/entities/types/user.entity";
import { Information } from "src/entities/types/userInfor.entity";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Account.name) private readonly user: Model<Account>,
    @InjectModel(Information.name) private readonly infor: Model<Information>,
  ) {}
  async findByEmail(email: string): Promise<Account> {
    return this.user
      .findOne({
        email,
      })
      .lean();
  }

  async create({
    email,
    password_hash,
    userName,
  }: {
    email: string;
    password_hash: string;
    userName: string;
  }) {
    const entity = await this.user.create({
      email,
      password_hash,
      username: userName,
    });
    const ifo = await this.infor.create({
      name: userName,
      accountId: entity._id,
    });
    return { email, userName };
  }

  async findOne(id: ObjectId): Promise<Admin> {
    return this.infor.findById(id).populate({ path: "accountId" });
  }

  async getProfile(email: string) {
    const user = await this.user.findOne({ email }).lean();
    if (!user) throw new UnauthorizedException("User not found");
    const profile = await this.infor
      .findOne({ accountId: user._id })
      .populate({ path: "accountId", select: "-_id username email isActive" })
      .lean();
    return profile;
  }

  async updateToken(id: ObjectId, refreshToken: string): Promise<Admin> {
    return this.user.findByIdAndUpdate(id, { refreshToken });
  }
}
