import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    next();
  }
}
