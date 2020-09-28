import { UserService } from './../user/user.service';
import { LoginService } from './login.service';
import { LoginDto } from './login.interface';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService, private userService: UserService) { }
  @ApiTags("用户登录")
  @Post()
  async submit(@Body() { username, password }: LoginDto) {
    const isEmail = username.indexOf("@") != -1
    if (isEmail) {
      const user = await this.userService.findEmail(username);
      if (!user) {
        return {
          message: "用户名或密码不正确",
          statusCode: 500
        }
      } else {
        password = bcrypt.compareSync(password, user.password)
        if (password) {
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
        } else {
          return {
            message: "用户名或密码不正确",
            statusCode: 500
          }
        }
      }
    } else {
      const user = await this.userService.findUsername(username);
      if (!user) {
        return {
          message: "用户名或密码不正确",
          statusCode: 500
        }
      } else {
        password = bcrypt.compareSync(password, user.password)
        if (password) {
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
        } else {
          return {
            message: "用户名或密码不正确",
            statusCode: 500
          }
        }
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
