import { RoleDto } from './role.interface';
import { RoleService } from './role.service';
import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) { }
  @Get()
  @ApiTags("查询角色")
  async find() {
    const res = await this.roleService.find();
    return {
      data: res,
      message: "success",
      statusCode: 200
    }
  }
  @Get('/:id')
  @ApiParam({
    name: "id",
    description: "请输入角色ID值"
  })
  @ApiTags("查询单独角色")
  async findId(@Param('id') id: string) {
    const res = await this.roleService.find(id);
    return {
      data: res,
      message: "success",
      statusCode: 200
    }
  }

  @Post()
  @ApiTags("新建角色")
  create(@Body() role: RoleDto) {
    this.roleService.create(role)
    return {
      message: "success",
      statusCode: 200
    }
  }

  @Put("/:id")
  @ApiTags("修改角色")
  @ApiParam({
    name: "id",
    description: "请输入角色ID值"
  })
  async update(@Param('id') id: string, @Body() role: RoleDto) {
    await this.roleService.update(id, role)
    return {
      message: "success",
      statusCode: 200
    }
  }

  @ApiTags("删除角色")
  @Delete("/:id")
  @ApiParam({
    name: "id",
    description: "请输入角色ID值"
  })
  async delete(@Param('id') id: string) {
    await this.roleService.delete(id);
    return {
      message: "success",
      statusCode: 200
    }
  }
}
