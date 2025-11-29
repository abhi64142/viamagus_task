import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private repo: Repository<Team>,
  ) {}

  async create(dto: CreateTeamDto) {
    // Check for duplicate members within the same team
    const uniqueMembers = [...new Set(dto.members)];
    if (uniqueMembers.length !== dto.members.length) {
      throw new BadRequestException('Duplicate members are not allowed in a team');
    }

    // Check if any member already exists in another team
    const existingTeams = await this.repo.find();
    const existingMembers = new Set<string>();
    
    existingTeams.forEach(team => {
      team.members.forEach(member => existingMembers.add(member.toLowerCase()));
    });

    const conflictingMembers: string[] = [];
    dto.members.forEach(member => {
      if (existingMembers.has(member.toLowerCase())) {
        conflictingMembers.push(member);
      }
    });

    if (conflictingMembers.length > 0) {
      throw new ConflictException(
        `The following members are already in another team: ${conflictingMembers.join(', ')}`
      );
    }

    const team = this.repo.create(dto);
    return this.repo.save(team);
  }

  findAll() {
    return this.repo.find();
  }

  async findMemberInTeam(memberEmail: string): Promise<Team | null> {
    const teams = await this.repo.find();
    return teams.find(team => 
      team.members.some(member => member.toLowerCase() === memberEmail.toLowerCase())
    ) || null;
  }

  async isMemberInAnyTeam(memberEmail: string): Promise<boolean> {
    const team = await this.findMemberInTeam(memberEmail);
    return team !== null;
  }
}
