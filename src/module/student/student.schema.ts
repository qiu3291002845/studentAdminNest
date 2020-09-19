import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";

export class Student {
  @ApiProperty({
    description: "姓名",
    example: "张小宁"
  })
  @prop({ required: true })
  name: string

  @ApiProperty({
    description: "年龄",
    example: 19
  })
  @prop({ required: true })
  age: number

  @ApiProperty({
    description: "性别",
    example: "女"
  })
  @prop({ required: true })
  sex: string

  @ApiProperty({
    description: '出生日期',
    example: '2000-1-1',
  })
  @prop({ required: true })
  birthday: string

  @ApiProperty({
    description: '身份证',
    example: '130421XXXXXXXXXXXX',
  })
  @prop({
    required: true,
    min: 18,
    max: 18
  })
  idCard: string

  @ApiProperty({
    description: '家庭住址',
    example: '河北省邯郸市XXX区',
  })
  @prop({ required: true })
  homeAddress: string

  @ApiProperty({
    description: '班级',
    example: 1903,
  })
  @prop({ required: true })
  class: number

  @ApiProperty({
    description: '系别',
    example: '信息工程系',
  })
  @prop({ required: true })
  system: string

  @ApiProperty({
    description: '创建日期',
    example: '1600481965663',
  })
  @prop({ default: Date.now() })
  time: string
}