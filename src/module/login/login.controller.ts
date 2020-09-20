import { LoginService } from './login.service';
import { LoginDto } from './login.interface';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) { }
  @ApiTags("用户登录")
  @Post()
  submit(@Body() { username, password }: LoginDto) {
    if (username !== "admin" || password !== "123456") {
      return {
        message: "用户名或密码不正确",
        statusCode: 500
      }
    } else {
      const token = jwt.sign(
        {
         username: username,
        },
        "muddyrain"
      );
      return {
        messgae: "success",
        statusCode: 200,
        token
      }
    }
  }
  @Get('code')
  @ApiTags('验证码')
  async code(@Request() req, @Response() res) {
    let code = await this.loginService.captcha();
    res.type('image/svg+xml');
    let codeData = {
      img: code.data,
      text: code.text
    }
    res.send(codeData)
  }

}
