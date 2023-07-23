import { JwtAuthGuard } from './../../auth/guard/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CleantimeService } from './service/cleantime.service';

@Controller('/cleantime')
@UseGuards(JwtAuthGuard)
export class CleanTimeController {
  constructor(private readonly CleantimeService: CleantimeService) {}
  @Get()
  async getCleantime() {
    return this.CleantimeService.getCleantime();
  }
}
