import { InjectModel } from 'nestjs-typegoose';
import { Role } from './role.schema';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private readonly Role) { }
  async find(id?) {
    if (id) {
      return await this.Role.findOne({ _id: id });
    } else {
      return await this.Role.find({});
    }
  }
  async create(json) {
    await this.Role.create(json);
  }
  async update(id, json) {
    await this.Role.updateOne({ _id: id }, json);
  }
  async delete(id) {
    await this.Role.deleteOne({ _id: id })
  }
}
