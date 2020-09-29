import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { StudentModule } from './module/student/student.module';
import { LoginModule } from './module/login/login.module';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { OSSModule } from '@nest-public/nest-oss';
import { ToolService } from './module/tool/tool.service';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { ToolModule } from './module/tool/tool.module';
// Pug
// 阿里云 配置
const aliyunConfig = {
  client: {
    endpoint: 'oss-cn-beijing.aliyuncs.com', // endpoint域名
    accessKeyId: 'LTAI4G79gBgCCdgan6uVZjSY', // 账号
    accessKeySecret: 'f2VHOxDAQwHE0ajH9syiKAnO3e1pYn', // 密码
    bucket: 'czh1010', // 存储桶
    internal: false, // 是否使用阿里云内部网访问
    secure: true, // 使用 HTTPS
    cname: false, // 自定义endpoint
    timeout: '90s',
  },
  domain: '', // 自定义域名})],
};
const emailConfig = {
  useFactory: () => ({
    transport: 'smtps://1628814161@qq.com:rdbnlwjfioahcejf@smtp.qq.com',
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: join(__dirname, '../src/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
    options: {
    }
  })
}
@Module({
  imports: [TypegooseModule.forRoot('mongodb://127.0.0.1:27017/studentAdmin'), StudentModule, LoginModule, UserModule, RoleModule, OSSModule.forRoot(aliyunConfig), MailerModule.forRootAsync(emailConfig), ToolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
