import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Get()
  all() {
    return this.service.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/assign')
  assignTask(@Param('id') id: string, @Body() dto: AssignTaskDto) {
    return this.service.assignTask(id, dto);
  }
}
