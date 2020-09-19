import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty({
    example: "张小宁",
    required: true
  })
  name: string;
  @ApiProperty({
    example: '女',
    required: true
  })
  sex: string;
  @ApiProperty({
    example: 19,
    required: true
  })
  age: number;
  @ApiProperty({
    example: "2000-01-01"
  })
  birthday: number;
  @ApiProperty({
    example: "1304212000XXXXXXXX",
    required: true,
    minLength: 18,
    maxLength: 18
  })
  idCard: number;
  @ApiProperty({
    required: true,
    example: "河北省邯郸市丛台区"
  })
  homeAddress: string;
  @ApiProperty({
    required: true,
    example: 1903
  })
  class: number;
  @ApiProperty({
    required: true,
    example: "信息工程系"
  })
  system: string;
}
