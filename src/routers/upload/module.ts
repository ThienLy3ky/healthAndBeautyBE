import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
import { UploadController } from "./controller";
import { UploadService } from "./service";

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
