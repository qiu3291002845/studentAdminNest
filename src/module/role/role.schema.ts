import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
enum RoleType {
  "学生" = 0,
  "老师" = 1
}
enum RolePurview {
  "新建" = 0,
  "编辑" = 1,
  "删除" = 2,
}
export class Role {
  @ApiProperty({
    description: "角色名称"
  })
  @prop({
    required: true
  })
  type: RoleType

  @ApiProperty({
    description: "角色描述",
  })
  @prop({
    required: true
  })
  description: string

  @ApiProperty({
    description: "角色权限"
  })
  @prop(
    {
      require: true,
      type: Number
    }
  )
  purview: Array<RolePurview>

  @ApiProperty({
    description: '创建日期',
    example: '1600481965663',
  })
  @prop({ default: Date.now() })
  time: string
}
