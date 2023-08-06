import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
