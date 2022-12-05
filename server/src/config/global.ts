import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('global', () => ({
  host: env.HOST || '127.0.0.1',
  port: env.PORT || '9001',
}));
