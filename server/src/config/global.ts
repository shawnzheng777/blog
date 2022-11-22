import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('global', () => ({
    ip: env.HOST || '8888',
    port: env.PORT || '127.0.0.1',
}));
