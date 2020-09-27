import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { OSSService } from '@nest-public/nest-oss';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly OSSService: OSSService) { }

  @ApiTags('你好,世界')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags("上传图片")
  @Post('/admin/api/uploadManyOSS')

  @UseInterceptors(FilesInterceptor('imageUrl'))
  public async uploadManyOSS(@UploadedFile() imageUrl) {
    const result = await this.OSSService.upload(imageUrl);
    return result;
  }
}
