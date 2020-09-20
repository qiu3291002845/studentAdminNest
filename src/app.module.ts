import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { StudentModule } from './module/student/student.module';
import { LoginModule } from './module/login/login.module';


@Module({
  imports: [TypegooseModule.forRoot('mongodb://127.0.0.1:27017/studentAdmin'), StudentModule, LoginModule,],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule { }
