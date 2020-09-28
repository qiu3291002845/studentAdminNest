import { UserService } from './user.service';
import { UserDto } from './user.interceptor';
import { Body, Controller, Get, Post, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiParam, ApiTags, ApiProperty, ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'count',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description: "页码 例如: 1",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'pageSize',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description: "页大小 例如: 6",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'sort',
    enum: [1, -1],
    example: 1,
    description: "排序 例如: 1",
    required: true,
    type: Number
  })
  @ApiTags("用户查询")
  async find(@Query() { count, sort, pageSize }) {
    if (pageSize && count) {
      const res = await this.userService.find({ sort, count: (count - 1) * pageSize, pageSize })
      return {
        data: res,
        message: "success",
        statusCode: 200
      }
    } else {
      const res = await this.userService.find({ sort })
      return {
        data: res,
        message: "success",
        statusCode: 200
      }
    }
  }

  @ApiTags("新建用户")
  @Post()
  async create(@Body() user: UserDto) {
    const findUser = await this.userService.findUsername(user.username);
    const findEmail = await this.userService.findEmail(user.email)
    if (findUser) {
      return {
        message: "Username cannot be repeated",
        error: "username"
      }
    } else {
      if (findEmail) {
        return {
          message: "Email connot be repeated",
          error: "email"
        }
      } else {
        this.userService.create(user)
        return {
          message: "success",
          statusCode: 200
        }
      }
    }
  }

  @ApiTags("搜索用户")
  @Get('/search')
  @ApiQuery({
    name: "keyword",
    description: "搜素关键字",
    required: true,
    type: String
  })
  @ApiQuery({
    name: 'count',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'sort',
    enum: [1, -1],
    example: 1,
    description: "排序 例如: 1",
    required: false,
    type: Number
  })
  async search(@Query() { keyword, pageSize, sort, count }) {
    const res = await this.userService.search({ keyword, count: (count - 1) * pageSize, pageSize, sort })
    return {
      message: "success",
      statusCode: 200,
      data: res,
      total: res.length
    }
  }

  @ApiTags("查询唯一用户")
  @Get("/:id")
  @ApiParam({
    name: "id",
    description: "请输入用户ID值"
  })
  async findId(@Param('id') id: string) {
    const res = await this.userService.find({ id })
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
    const user = await this.userService.find({
      id: body.id
    });
    // 解密 验证
    let valid = bcrypt.compareSync(oldPass, user.password)
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
