import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('global', () => ({
  ip: env.HOST || '9003',
  port: env.PORT || '127.0.0.1',
}));
