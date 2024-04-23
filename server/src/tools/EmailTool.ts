import { emailConfig } from '@/config';
import * as nodemail from 'nodemailer';
import { renderHtml } from './html';

export class Email {
  private transporter = null;
  private config = emailConfig();

  constructor() {
    this.transporter = nodemail.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      auth: {
        user: this.config.user,
        pass: this.config.pass,
      },
    });
  }

  public send({ email, subject = 'Face - 欢迎注册' }) {
    const code = Math.random().toString().slice(-6);
    const options = {
      from: `${this.config.alias}<${this.config.user}>`,
      to: email,
      subject,
      text: `验证码为${code}`,
      html: renderHtml(code),
    };
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log('邮件发送失败');
      } else {
        console.log('邮件发送成功');
        console.log(info);
      }
    });
  }
}
