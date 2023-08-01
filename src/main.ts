import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
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

  await app.listen(3000, () => {
    console.log("app run in port:", 3000);
  });
}
bootstrap();
