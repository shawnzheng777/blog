import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('database', () => ({
    host: env.DB_HOST || '127.0.0.1',
    port: env.DB_PORT || 3306,
    username: env.DB_NAME || 'root',
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE || 'blog',
}))