import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class ToolService {
  constructor(private readonly mailerService: MailerService) { }
  sendEmail(email) {
    const code = parseInt(Math.random().toString().substr(4, 6));
    this.mailerService.sendMail({
      to: email,
      from: "1628814161@qq.com",
      subject: "——来自1903开发团队",
      template: "email",
      context: {
        code
      }
    });
    return code
  }
}
