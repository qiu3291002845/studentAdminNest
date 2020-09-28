import { ApiProperty } from "@nestjs/swagger";

enum RoleType {
  "学生" = 0,
  "老师" = 1
}
enum RolePurview {
  "新建" = 0,
  "编辑" = 1,
  "删除" = 1,
}
export class RoleDto {
  @ApiProperty({
    required: true,
    description: "角色名称",
    example: 0
  })
  type: RoleType

  @ApiProperty({
    required: true,
    description: "角色描述",
    example: "我是一个小角色"
  })
  description: string

  @ApiProperty({
    required: true,
    description: "角色权限",
    example: [0, 0, 0]
  })
  purview: Array<RolePurview>

}