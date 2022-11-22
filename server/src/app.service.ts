import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Worl222d!';
  }

  getUser(): string {
    return 'v_janyzheng';
  }
}
