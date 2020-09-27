import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { StudentModule } from './module/student/student.module';
import { LoginModule } from './module/login/login.module';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { OSSModule } from '@nest-public/nest-oss';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://127.0.0.1:27017/studentAdmin'), StudentModule, LoginModule, UserModule, RoleModule, OSSModule.forRoot({
    client: {
      endpoint: 'oss-cn-shenzhen.aliyuncs.com', // endpoint域名
      accessKeyId: 'xxxxxxxxxxxx', // 账号
      accessKeySecret: 'xxxxxxx', // 密码
      bucket: 'xxxxxx', // 存储桶
      internal: false, // 是否使用阿里云内部网访问
      secure: true, // 使用 HTTPS
      cname: false, // 自定义endpoint
      timeout: '90s',
    }, domain: '', // 自定义域名})],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
