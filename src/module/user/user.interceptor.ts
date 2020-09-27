import { Role } from './../role/role.schema';
import { Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({
    required: true,
    description: "用户名",
    example: "admin"
  })
  username: string

  @ApiProperty({
    required: true,
    description: "密码",
    example: "123456"
  })
  password: string

  @ApiProperty({
    description: "头像",
    example: "https://czh1010.oss-cn-beijing.aliyuncs.com/avatar/1.gif"
  })
  avatar: string

  @ApiProperty({
    required: true,
    description: "昵称",
    example: "小白"
  })
  name: string

  @ApiProperty({
    description: '用户权限',
    example: "5f70b66c3657de5f58240fba"
  })
  role: Ref<Role>
}