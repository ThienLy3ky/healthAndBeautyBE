import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Health and beauty shop")
    .setDescription("Health and beauty shop Api")
    .setVersion("1.0")
    .addTag("api")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentation", app, document);
  const appConfig = app.get(ConfigService);
  await app.listen(appConfig.get("port"), () => {
    console.log("app run in port:", appConfig.get("port"));
  });
}
bootstrap();
