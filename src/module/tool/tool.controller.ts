import { ToolService } from './tool.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('tool')
export class ToolController {
  constructor(private toolService: ToolService) { }
  @Get('/email/:email')
  @ApiTags("电子邮箱")
  @ApiProperty({
    name: "email",
    description: "电子邮箱",
  })
  sendEmail(@Param('email') email: string) {
    const code = this.toolService.sendEmail(email)
    return {
      message: "发送电子邮件成功",
      statusCode: 200,
      code
    }
  }
}
