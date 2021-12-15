import { Module } from '@nestjs/common';
import { DbModulesService } from './db-modules.service';
import { DbModulesController } from './db-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './entities/db-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DbModule])],
  controllers: [DbModulesController],
  providers: [DbModulesService],
})
export class DbModulesModule {}
