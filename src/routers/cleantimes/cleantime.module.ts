import { JwtStrategy } from './../../auth/strategy/jwt.strategy';
import { CleanTimeController } from './cleantime.controller';
import { CleantimeService } from './service/cleantime.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [CleantimeService],
  controllers: [CleanTimeController],
})
export class CleanTimeModule {}
