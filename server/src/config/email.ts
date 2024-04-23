import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // 别名
  alias: 'Face',
  // 邮件服务器地址
  host: 'smtp.qq.com',
  // 邮件服务器端口
  port: 465,
  // 是否使用默认465端口
  secure: true,
  user: '1728153676@qq.com',
  pass: process.env.PASS,
}));
