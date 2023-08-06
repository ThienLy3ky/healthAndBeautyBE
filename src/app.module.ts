import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import config from "config";
import { CompanyModule } from "./routers/admin/company/module";
import { CommonResInterceptor } from "./interceptors";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { RawBodyMiddleware } from "./middleware/raw-body.middleware";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { ProductTypeModule } from "./routers/admin/typeProduct/module";
import { BannerModule } from "./routers/admin/banner/module";
import { BillModule } from "./routers/admin/bill/module";
import { CategoryModule } from "./routers/admin/catergory/module";
import { CodeSaleModule } from "./routers/admin/codeSale/module";
import { SaleModule } from "./routers/admin/sale/module";
import { GroupProductModule } from "./routers/admin/groupProduct/module";
import { DrugProductModule } from "./routers/admin/product/module";
import { SettingModule } from "./routers/admin/setting/module";
import { ProductSizeModule } from "./routers/admin/sizeProduct/module";
import { SpeciesProductModule } from "./routers/admin/species/module";
import { UploadModule } from "./routers/upload/module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/admin"),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CompanyModule,
    ProductTypeModule,
    BannerModule,
    BillModule,
    CategoryModule,
    CodeSaleModule,
    CompanyModule,
    GroupProductModule,
    DrugProductModule,
    SaleModule,
    SettingModule,
    ProductSizeModule,
    SpeciesProductModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CommonResInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
