import { StudentService } from './student.service';
import { StudentDto } from './student.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) { }
  @ApiTags("查询所有学生")
  @Get()
  @ApiQuery({
    name: 'count',
    description: "页码 例如: 1",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'pageSize',
    description: "页大小 例如: 6",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'sort',
    description: "排序 例如: 1",
    required: false,
    type: Number
  })
  async find(@Query() { count, sort, pageSize }) {
    if (pageSize && count) {
      const res = await this.studentService.find({ sort, count: (count - 1) * pageSize, pageSize })
      return {
        message: "success",
        statusCode: 200,
        data: res,
        total: res.length
      }
    } else {
      const res = await this.studentService.find({ sort })
      return {
        message: "success",
        statusCode: 200,
        data: res,
        total: res.length
      }
    }

  }
  @ApiTags("搜索学生")
  @Get('/search')
  @ApiQuery({
    name: "keyword",
    description: "搜素关键字",
    required: true,
    type: String
  })
  @ApiQuery({
    name: 'count',
    description: "页码 例如: 1",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    description: "页大小 例如: 6",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'sort',
    description: "排序 例如: 1",
    required: false,
    type: Number
  })
  async search(@Query() { keyword, pageSize, sort, count}) {
    const res = await this.studentService.search({ keyword, count: (count - 1) * pageSize, pageSize, sort })
    return {
      message: "success",
      statusCode: 200,
      data: res,
      total: res.length
    }
  }

  @ApiTags('根据ID查询学生')
  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入学生ID'
  })
  async findId(@Param('id') id: string) {
    const res = await this.studentService.find({ id });
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
