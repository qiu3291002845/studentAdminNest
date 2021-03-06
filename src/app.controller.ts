import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import { OSSService } from '@nest-public/nest-oss';
import { FilesInterceptor } from '@nestjs/platform-express';
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly OSSService: OSSService) { }

  @ApiTags('你好,世界')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags("单个图片上传")
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单个图片上传',
    type: FileUploadDto,
  })
  @UseInterceptors(FilesInterceptor('file'))
  public async uploadManyOSS(@UploadedFiles() file) {
    const result = await this.OSSService.upload(file);
    return result[0];
  }
}
