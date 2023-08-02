import { Injectable } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
