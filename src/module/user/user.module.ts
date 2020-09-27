import { User } from './user.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
