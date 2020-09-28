import { ToolService } from './tool.service';
import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';

@Module({
  providers: [ToolService],
  controllers: [ToolController]
})
export class ToolModule { }
