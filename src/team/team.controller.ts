import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';

@Controller('team')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private service: TeamService) {}

  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
