import { StudentService } from './student.service';
import { StudentDto } from './student.interface';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) { }
  @ApiTags("查询所有学生")
  @Get()
  async find() {
    const res = await this.studentService.find()
    return {
      message: "success",
      statusCode: 200,
      data: res,
    }
  }

  @ApiTags('根据ID查询学生')
  @Get('/:id')
  @ApiParam({
    name: 'id',
    example: '5f656e0f0d83378548c701f9',
    description: '请输入学生ID'
  })
  async findId(@Param('id') id: string) {
    const res = await this.studentService.find(id);
    return {
      message: "success",
      statusCode: 200,
      data: res,
    }
  }

  @ApiTags("创建学生")
  @Post()
  create(@Body() studentDto: StudentDto) {
    this.studentService.create(studentDto)
    return {
      message: "success",
      statusCode: 200,
    }
  }

  @ApiTags("修改学生信息")
  @Put("/:id")
  @ApiParam({
    name: 'id',
    example: '5f656e0f0d83378548c701f9',
    description: '请输入学生ID'
  })
  async update(@Param('id') id: string, @Body() studentDto: StudentDto) {
    await this.studentService.update(id, studentDto)
    return {
      message: "success",
      statusCode: 200,
    }
  }

  @ApiTags("删除学生")
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    example: '5f656e0f0d83378548c701f9',
    description: '请输入学生ID'
  })
  async delete(@Param('id') id: string) {
    await this.studentService.delete(id)
    return {
      message: "success",
      statusCode: 200,
    }
  }
}
