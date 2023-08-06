import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  GroupProduct,
  GroupProductSchema,
} from "src/entities/types/group.entity";
import { GroupProductController } from "./controller";
import { GroupProductService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GroupProduct.name, schema: GroupProductSchema },
    ]),
  ],
  controllers: [GroupProductController],
  providers: [GroupProductService],
})
export class GroupProductModule {}
