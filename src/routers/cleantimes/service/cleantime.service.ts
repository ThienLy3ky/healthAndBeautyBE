import { Injectable } from '@nestjs/common';

@Injectable()
export class CleantimeService {
  async getCleantime() {
    return { message: 'no data available' };
  }

  async createCleantime() {
    return { message: 'success' };
  }
}
