import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiTags('你好,世界')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
