import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Admin } from "src/entities/types/admin.entity";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin.name) private readonly Admin: Model<Admin>) {}

  async findByEmail(email: string): Promise<Admin> {
    return this.Admin.findOne({
      email,
    }).lean();
  }

  async create({
    email,
    password_hash,
  }: {
    email: string;
    password_hash: string;
  }): Promise<Admin> {
    const entity = this.Admin.create({
      email,
      password_hash,
    });
    return entity;
  }

  async findOne(id: ObjectId): Promise<Admin> {
    return this.Admin.findById(id);
  }
  async updateToken(id: ObjectId, refreshToken: string): Promise<Admin> {
    return this.Admin.findByIdAndUpdate(id, { refreshToken });
  }
}
