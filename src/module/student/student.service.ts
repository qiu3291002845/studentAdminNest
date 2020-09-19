import { StudentDto } from './student.interface';
import { Student } from './student.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student) private readonly Student) { }
  async find({
    id = undefined,
    count = null,
    sort = null,
    pageSize = null,
  }) {
    if (id === undefined) {
      if (pageSize == 0) {
        return await this.Student.find().sort({ time: sort });
      } else {
        return await this.Student.find().sort({ time: sort }).limit(pageSize * 1).skip(count * 1);
      }
    }
    else {
      console.log(2)
      return await this.Student.findOne({ _id: id });
    }
  }
  async create(json: StudentDto) {
    await this.Student.create(json);
  }
  async update(id: string, json) {
    await this.Student.updateOne({ _id: id, }, json)
  }
  async delete(id: string) {
    await this.Student.deleteOne({ _id: id })
  }
  async search({
    keyword,
    count,
    pageSize,
    sort = 1
  }) {
    if (
      count !== NaN && pageSize !== undefined
    ) {
      let query = new RegExp(keyword, 'i');//模糊查询参数  i 是 不区分大小写
      return await this.Student.find({
        $or: [
          { "name": query },
          { "age": query },
          { "sex": query },
          { "birthday": query },
          { "idCard": query },
          { "homeAddress": query },
          { "system": query },
          { "phone": query },
          { "nation": query },
          { "political": query },
          { "email": query },
        ]
      }).skip(count * 1).limit(pageSize * 1).sort({
        'time': sort
      })
    } else {
      let query = new RegExp(keyword, 'i');//模糊查询参数  i 是 不区分大小写
      return await this.Student.find({
        $or: [
          { "name": query },
          { "age": query },
          { "sex": query },
          { "birthday": query },
          { "idCard": query },
          { "homeAddress": query },
          { "system": query },
          { "phone": query },
          { "nation": query },
          { "political": query },
          { "email": query },
        ]
      }).sort({
        'time': sort
      })
    }

  }
}
