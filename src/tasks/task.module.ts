import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TeamModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
