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
    return this.user.findOne({
      where: {
        email,
      },
    });
  }

  async create({
    email,
    password_hash,
  }: {
    email: string;
    password_hash: string;
  }): Promise<Admin> {
    const entity = this.user.create({
      email,
      password_hash,
    });
    return entity;
  }

  async findOne(id: ObjectId): Promise<Admin> {
    return this.user.findById(id);
  }

  async getProfile(email: string) {
    const user = await this.user.findOne({ email });
    if (!user) throw new UnauthorizedException("User not found");
    const profile = await this.infor.findOne({ accountId: user._id });
    return { user, profile };
  }

  async updateToken(id: ObjectId, refreshToken: string): Promise<Admin> {
    return this.user.findByIdAndUpdate(id, { refreshToken });
  }
}
