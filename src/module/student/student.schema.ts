import { professionScore, usallyScore } from './student.interface';
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
  age: string

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
  })
  idCard: string

  @ApiProperty({
    description: '家庭住址',
    example: '河北省邯郸市XXX区',
  })
  @prop({ required: true })
  homeAddress: string

  @ApiProperty({
    description: '手机号码',
    example: "15100404109",
  })
  @prop({
    required: true,
  })
  phone: string

  @ApiProperty({
    description: '民族',
    example: '汉族',
  })
  @prop({
    required: true,
  })
  nation: string

  @ApiProperty({
    description: '班级',
    example: '1903',
  })
  @prop({ required: true })
  class: string

  @ApiProperty({
    description: '系别',
    example: '信息工程系',
  })
  @prop({ required: true })
  system: string

  @ApiProperty({
    description: '电子邮箱',
    example: '1628814161@qq.com',
  })
  @prop({ required: true })
  email: string

  @ApiProperty({
    description: '政治面貌',
    example: '群众',
  })
  @prop({ required: true })
  political: string

  @ApiProperty({
    description: '创建日期',
    example: '1600481965663',
  })
  @prop({ default: Date.now() })
  time: string

  @ApiProperty({
    required: true,
    example: [
      {
        time: "1654503123123",
        type: 1,
        fraction: 5,
        description: "上课搞基"
      }
    ],
    description: "平时成绩"
  })
  @prop({ required: true })
  usallyScore: Array<usallyScore>

  @ApiProperty({
    required: true,
    example: [{ quality: 60, fullStack: 50 }],
    description: "专业成绩"
  })
  @prop({ required: true })
  professionScore: Array<professionScore>
}
