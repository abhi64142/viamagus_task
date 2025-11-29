import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URL,
  synchronize: true,
  autoLoadEntities: true,
};
