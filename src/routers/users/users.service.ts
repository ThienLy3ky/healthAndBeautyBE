import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { StatusBill } from "src/entities/enum/status.enum";
import { Admin } from "src/entities/types/admin.entity";
import { Bill } from "src/entities/types/bill.entity";
import { Account } from "src/entities/types/user.entity";
import { Information } from "src/entities/types/userInfor.entity";
import { ChangePass, UpdateProfile } from "./dto";
import { compareSync, hashSync } from "bcrypt";

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
      .populate({
        path: "accountId",
        select: "-_id username email isActive sdt",
      })
      .lean();
    return profile;
  }

  async updateToken(id: ObjectId, refreshToken: string): Promise<Admin> {
    return this.user.findByIdAndUpdate(id, { refreshToken }).lean();
  }
  async activeUser(id: ObjectId): Promise<Account> {
    return this.user.findByIdAndUpdate(id, { isActive: true }).lean();
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
    const accountId = await this.findByEmail(user.accountId.email);
    const data = await this.bill
      .find(status ? { status, accountId } : { accountId })
      .populate({
        path: "Product",
        populate: [
          {
            path: "product",
            model: "DrugProduct",
            select: { _id: 1, name: 1, code: 1 },
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
      })
      .lean();
    return data;
  }

  async getlistCode(user) {
    const data = await this.bill.find();
  }
  async cancelOrder(codebill, user) {
    const accountId = await this.findByEmail(user.accountId.email);
    const check = await this.bill
      .findOne({
        code: codebill,
        accountId,
        status: { $lt: StatusBill.Shipping, $gt: StatusBill.Cancel },
      })
      .lean();
    if (!check) throw new BadRequestException("Không tìm thấy đơn hàng");
    return await this.bill.updateOne(
      { code: codebill },
      { status: StatusBill.Cancel },
    );
  }
  async updateProfile(data: UpdateProfile, user: any) {
    const { name, sdt, username, password, image } = data;
    const accountId = await this.user
      .findOne({ email: user.accountId.email })
      .lean();
    const password_hash_admin = compareSync(password, accountId.password_hash);
    if (!password_hash_admin) return false;
    await Promise.all([
      this.infor.findOneAndUpdate({ _id: user._id }, { name, image }).lean(),
      this.user.findOneAndUpdate({ _id: accountId._id }, { username, sdt }),
      ,
    ]);
    return true;
  }
  async ChangePass({ newPassWord, password }: ChangePass, user: any) {
    const accountId = await this.findByEmail(user.accountId.email);
    const password_hash_admin = compareSync(password, accountId.password_hash);
    if (!password_hash_admin) return false;
    await Promise.all([
      this.user.findOneAndUpdate(
        { _id: accountId._id },
        { password_hash: hashSync(newPassWord, 10) },
      ),
      ,
    ]);
    return true;
  }
  async addAddress(user, address: string) {
    const res = await this.infor
      .findByIdAndUpdate(user._id, {
        $push: { address },
      })
      .lean();
    return res ? true : false;
  }
}
