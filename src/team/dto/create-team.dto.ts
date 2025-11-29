import { IsString, IsNotEmpty, IsArray, IsEmail, MinLength, MaxLength, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateTeamDto {
  @IsString({ message: 'Team name must be a string' })
  @IsNotEmpty({ message: 'Team name is required' })
  @MinLength(2, { message: 'Team name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Team name must not exceed 100 characters' })
  name: string;

  @IsArray({ message: 'Members must be an array' })
  @IsNotEmpty({ message: 'Members array is required' })
  @ArrayMinSize(1, { message: 'Team must have at least 1 member' })
  @ArrayMaxSize(50, { message: 'Team cannot have more than 50 members' })
  @IsEmail({}, { each: true, message: 'Each member must be a valid email address' })
  members: string[];
}
