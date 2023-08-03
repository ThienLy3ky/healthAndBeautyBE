import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import config from "config";
import { CompanyModule } from "./routers/admin/company/module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/admin"),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
