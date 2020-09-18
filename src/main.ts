import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// 引入 express 平台
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 静态资源配置
  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '../src/', 'public'), {
    // prefix: '/static/'
  })
  const options = new DocumentBuilder()
    .setTitle('学生管理系统')
    .setDescription('——来自1903的团队')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();