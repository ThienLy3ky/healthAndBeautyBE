import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Admin } from "src/entities/types/admin.entity";
import { Account } from "src/entities/types/user.entity";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Account.name) private readonly user: Model<Account>,
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

  async updateToken(id: ObjectId, refreshToken: string): Promise<Admin> {
    return this.user.findByIdAndUpdate(id, { refreshToken });
  }
}
