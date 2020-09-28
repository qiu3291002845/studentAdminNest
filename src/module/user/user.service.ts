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
  async find({
    id = undefined,
    count = null,
    sort = null,
    pageSize = null,
  }) {
    if (id === undefined) {
      if (pageSize == 0) {
        return await this.User.find().sort({ time: sort }).populate('role');
      } else {
        return await this.User.find().sort({ time: sort }).limit(pageSize * 1).skip(count * 1).populate('role');
      }
    }
    else {
      return await this.User.findOne({ _id: id }).populate('role');;
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
  async findEmail(email) {
    return await this.User.findOne({ email: email })
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
      return await this.User.find({
        $or: [
          { "name": query },
          { "email": query }
        ]
      }).skip(count * 1).limit(pageSize * 1).sort({
        'time': sort
      })
    } else {
      let query = new RegExp(keyword, 'i');//模糊查询参数  i 是 不区分大小写
      return await this.User.find({
        $or: [
          { "name": query },
          { "email": query }
        ]
      }).sort({
        'time': sort
      })
    }
  }
}
