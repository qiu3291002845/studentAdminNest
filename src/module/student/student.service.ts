import { StudentDto } from './student.interface';
import { Student } from './student.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student) private readonly Student) { }
  async find(id?: string) {
    if (!id)
      return await this.Student.find();
    else
      return await this.Student.findOne({ _id: id });
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


  async search() {

  }
}
