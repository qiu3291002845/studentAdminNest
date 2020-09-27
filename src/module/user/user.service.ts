import { UserDto } from './user.interceptor';
import { User } from './user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly User) { }
  async create(json: UserDto) {
    await this.User.create(json);
  }
  async find(id?) {
    if (id) {
      return await this.User.findOne({ _id: id }).populate('role')
    } else {
      return await this.User.find({}).populate('role')
    }
  }
  async update(id, json) {
    await this.User.update({ _id: id }, json);
  }
  async delete(id) {
    await this.User.delete({ _id: id })
  }
  async updatePass(id, pass) {
    await this.User.updateOne({ _id: id }, { password: pass })
  }
  async findUsername(username) {
    return await this.User.findOne({ username: username })
  }
}
