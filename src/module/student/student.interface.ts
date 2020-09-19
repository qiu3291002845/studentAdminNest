import { ApiProperty } from '@nestjs/swagger';

export interface usallyScore {
  time: string,
  type: number,
  fraction: number,
  description: string,
}
export interface professionScore {
  quality: number,
  fullStack: number
}

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
    example: "19",
    required: true
  })
  age: string;

  @ApiProperty({
    example: "2000-01-01"
  })
  birthday: string;

  @ApiProperty({
    example: "1304212000XXXXXXXX",
    required: true,
  })
  idCard: string;

  @ApiProperty({
    required: true,
    example: "河北省邯郸市丛台区"
  })
  homeAddress: string;

  @ApiProperty({
    required: true,
    example: '1903'
  })
  class: string;

  @ApiProperty({
    required: true,
    example: "信息工程系"
  })
  system: string;

  @ApiProperty({
    required: true,
    example: "xxxxx@qq.com"
  })
  email: string;
  @ApiProperty({
    required: true,
    example: "群众"
  })
  political: string

  @ApiProperty({
    required: true,
    example: "15100404109"
  })
  phone: number;

  @ApiProperty({
    required: true,
    example: "汉族"
  })
  nation: string

  @ApiProperty({
    example: [],
  })
  usallyScore: Array<usallyScore>

  @ApiProperty({
    example: [],
  })
  professionScore: Array<professionScore>
}
