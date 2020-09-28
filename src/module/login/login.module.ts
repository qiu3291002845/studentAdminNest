import { User } from './../user/user.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [LoginService, UserService],
  controllers: [LoginController]
})
export class LoginModule { }
