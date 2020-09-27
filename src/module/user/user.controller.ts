import { UserService } from './user.service';
import { UserDto } from './user.interceptor';
import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { ApiParam, ApiTags, ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs'
class volidatePass {
  @ApiProperty({
    required: true,
    description: "id",
  })
  id: any;
  @ApiProperty({
    required: true,
    description: "密码"
  })
  pass: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  @Get()
  @ApiTags("用户查询")
  async find() {
    const res = await this.userService.find()
    return {
      data: res,
      message: "success",
      statusCode: 200
    }
  }

  @ApiTags("新建用户")
  @Post()
  async create(@Body() user: UserDto) {
    const findUser = await this.userService.findUsername(user.username);
    if (findUser) {
      return {
        message: "Username cannot be repeated"
      }
    } else {
      this.userService.create(user)
      return {
        message: "success",
        statusCode: 200
      }
    }
  }

  @ApiTags("查询唯一用户")
  @Get("/:id")
  @ApiParam({
    name: "id",
    description: "请输入用户ID值"
  })
  async findId(@Param('id') id: string) {
    const res = await this.userService.find(id)
    return {
      data: res,
      message: "success",
      statusCode: 200
    }
  }

  @ApiTags("修改用户信息")
  @Put("/:id")
  @ApiParam({
    name: "id",
    description: "请输入用户ID值"
  })
  async update(@Param("id") id: string, @Body() user: UserDto) {
    const updateBody = {
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      role: user.role
    }
    await this.userService.update(id, updateBody)
    return {
      message: "success",
      statusCode: 200
    }
  }

  @ApiTags("删除用户")
  @Delete("/:id")
  @ApiParam({
    name: "id",
    description: "请输入用户ID值"
  })
  async delete(@Param("id") id: string) {
    await this.userService.delete(id)
    return {
      message: "success",
      statusCode: 200
    }
  }

  @ApiTags("修改密码")
  // 更改密码
  @Post('/updatePass')
  async updatePass(@Body() body: volidatePass) {
    // console.log(body);
    await this.userService.updatePass(body.id, body.pass)
    return {
      success: '修改成功'
    }
  }

  @ApiTags("检验旧密码")
  // 校验旧密码
  @Post('volidateOldPass')
  async volidateOldPass(@Body() body: volidatePass) {
    let oldPass: any = body.pass;
    const user = await this.userService.find(body.id);
    // 解密 验证
    let valid = bcrypt.compareSync(oldPass, user.password)
    console.log(valid)
    if (valid) {
      return {
        message: "Fully match the old password",
        statusCode: 200
      }
    } else {
      return {
        message: 'Does not match the old password',
        statusCode: 500
      }
    }
  }
}
