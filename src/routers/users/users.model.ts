import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "src/entities/types/user.entity";
import {
  Information,
  InformationSchema,
} from "src/entities/types/userInfor.entity";
import { BillModule } from "../admin/bill/module";
import { UserController } from "./user.controller";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Information.name, schema: InformationSchema },
    ]),
    BillModule,
  ],
})
export class UsersModule {}
