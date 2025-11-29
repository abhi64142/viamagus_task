import { IsString, IsNotEmpty, IsOptional, IsEmail, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(3, { message: 'Description must be at least 3 characters long' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description: string;

  @IsString({ message: 'Due date must be a string' })
  @IsNotEmpty({ message: 'Due date is required' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { 
    message: 'Due date must be in YYYY-MM-DD format (e.g., 2024-12-31)' 
  })
  due_date: string;

  @IsString({ message: 'Assignee must be a string' })
  @IsOptional()
  @IsEmail({}, { message: 'Assignee must be a valid email address' })
  assignee?: string;
}
