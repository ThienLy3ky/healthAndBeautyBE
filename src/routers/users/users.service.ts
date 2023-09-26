import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { Status, StatusBill } from "src/entities/enum/status.enum";
import { Admin } from "src/entities/types/admin.entity";
import { Bill } from "src/entities/types/bill.entity";
import { Account } from "src/entities/types/user.entity";
import { Information } from "src/entities/types/userInfor.entity";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Account.name) private readonly user: Model<Account>,
    @InjectModel(Information.name) private readonly infor: Model<Information>,
    @InjectModel(Bill.name) private readonly bill: Model<Bill>,
  ) {}
  async findByEmail(email: string): Promise<Account> {
    return this.user
      .findOne({
        email,
        isdeleted: null,
      })
      .lean();
  }

  async create({
    email,
    password_hash,
    userName,
    expVerify,
    codeVerify,
  }: {
    email: string;
    password_hash: string;
    userName: string;
    expVerify: Date;
    codeVerify: string;
  }) {
    const entity = await this.user.create({
      expVerify,
      email,
      password_hash,
      username: userName,
      codeVerify,
    });
    await this.infor.create({
      name: userName,
      accountId: entity._id,
    });
    return { email, userName };
  }

  async findOne(email: string): Promise<User> {
    const user = await this.user.findOne({ email }).lean();
    return user;
  }

  async getProfile(email: string) {
    const user = await this.user.findOne({ email, isdeleted: null }).lean();
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
  async activeUser(id: ObjectId): Promise<Account> {
    return this.user.findByIdAndUpdate(id, { isActive: true });
  }
  async updateCode(
    id: ObjectId,
    codeVerify: string,
    expVerify: Date,
  ): Promise<Account> {
    return this.user.findByIdAndUpdate(id, { codeVerify, expVerify });
  }

  async getListOrder(user, status?: StatusBill) {
    const field = { _id: 0, name: 1 };
    console.log(
      "🚀 ~ file: users.service.ts:90 ~ UsersService ~ getListOrder ~ StatusBill:",
      status,
    );
    const data = await this.bill
      .find(/* { accountId: user._id } */ status ? { status } : {})
      .populate({
        path: "Product",
        populate: [
          {
            path: "product",
            model: "DrugProduct",
            select: { _id: 1, name: 1 },
          },
          {
            path: "size",
            model: "ProductSize",
            select: field,
          },
          {
            path: "group",
            model: "GroupProduct",
            select: field,
          },
          {
            path: "style",
            model: "StyleProduct",
            select: field,
          },
        ],
      });
    console.log(
      "🚀 ~ file: users.service.ts:101 ~ UsersService ~ getListOrder ~ data:",
      data,
    );
    return data;
  }
  async getlistCode(user) {
    const data = await this.bill.find();
  }
  async cancelOrder(codebill, user) {
    console.log(
      "🚀 ~ file: users.service.ts:96 ~ UsersService ~ cancelOrder ~ user:",
      user ? true : false,
    );
    const check = await this.bill
      .findOne({ code: codebill, status: { $lt: StatusBill.Shipping } })
      .lean();
    if (!check) throw new BadRequestException("Không tìm thấy đơn hàng");
    return await this.bill.updateOne(
      { code: codebill },
      { status: StatusBill.Cancel },
    );
  }
  async updateProfile(code: string, user) {
    const data = await this.bill.find();
  }
  async addAddress(user, address: string) {
    console.log(
      "🚀 ~ file: users.service.ts:149 ~ UsersService ~ addAddress ~ address:",
      address,
    );
    const res = await this.infor.findByIdAndUpdate(user._id, {
      $push: { address },
    });
    return res ? true : false;
  }
}
