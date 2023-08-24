import { Module } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/entities/types/admin.entity";

@Module({
  providers: [AdminsService],
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  exports: [AdminsService],
})
export class AdminsModule {}
