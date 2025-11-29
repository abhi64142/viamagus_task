import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { TasksModule } from './tasks/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    TeamModule,
    TasksModule,
  ],
})
export class AppModule {}
