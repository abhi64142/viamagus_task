import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { TeamService } from '../team/team.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
    private teamService: TeamService,
  ) {}

  async create(dto: CreateTaskDto) {
    // Validate assignee exists in a team if provided
    if (dto.assignee) {
      const isMember = await this.teamService.isMemberInAnyTeam(dto.assignee);
      if (!isMember) {
        throw new BadRequestException(
          `Assignee "${dto.assignee}" is not a member of any team`
        );
      }
    }

    return this.repo.save(this.repo.create({ ...dto, status: 'pending' }));
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: string, dto: UpdateTaskDto) {
    const objectId = new ObjectId(id);
    const task = await this.repo.findOne({ where: { id: objectId } as any });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Validate assignee exists in a team if being updated
    if (dto.assignee) {
      const isMember = await this.teamService.isMemberInAnyTeam(dto.assignee);
      if (!isMember) {
        throw new BadRequestException(
          `Assignee "${dto.assignee}" is not a member of any team`
        );
      }
    }

    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async assignTask(id: string, dto: AssignTaskDto) {
    const objectId = new ObjectId(id);
    const task = await this.repo.findOne({ where: { id: objectId } as any });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Validate assignee exists in a team
    const isMember = await this.teamService.isMemberInAnyTeam(dto.assignee);
    if (!isMember) {
      throw new BadRequestException(
        `Assignee "${dto.assignee}" is not a member of any team`
      );
    }

    task.assignee = dto.assignee;
    return this.repo.save(task);
  }
}
