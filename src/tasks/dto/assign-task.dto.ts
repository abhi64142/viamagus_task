import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AssignTaskDto {
  @IsString({ message: 'Assignee must be a string' })
  @IsNotEmpty({ message: 'Assignee is required' })
  @IsEmail({}, { message: 'Assignee must be a valid email address' })
  assignee: string;
}
