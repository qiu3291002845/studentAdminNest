import { Role } from './../role/role.schema';
import { ApiProperty } from '@nestjs/swagger';
import { mongoose, prop, Ref } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs'
export class User {
  @ApiProperty({
    required: true,
    description: "用户名"
  })
  @prop({
    required: true,
  })
  username: string

  @ApiProperty({
    required: true,
    description: "密码"
  })
  @prop({
    required: true,
    set(val): string {
      return bcrypt.hashSync(val, bcrypt.genSaltSync(10)).toString()
    },
    get: (val: string) => val
  })
  password: string

  @ApiProperty({
    default: "https://czh1010.oss-cn-beijing.aliyuncs.com/avatar/1.gif",
    description: "头像"
  })
  @prop({
    default: "https://czh1010.oss-cn-beijing.aliyuncs.com/avatar/1.gif"
  })
  avatar: string

  @ApiProperty({
    required: true,
    description: "昵称"
  })
  @prop()
  name: string

  @ApiProperty({
    description: "电子邮箱",
    required: true
  })
  @prop({
    required: true,
  })
  email: string

  @ApiProperty({
    description: '用户权限',
  })
  @prop({
    // refType: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: "5f70b66c3657de5f58240fba"
  })
  role: Ref<Role>
}