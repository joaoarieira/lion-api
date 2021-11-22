import { Module } from '@nestjs/common';
import { CampusesService } from './campuses.service';
import { CampusesController } from './campuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campus])],
  controllers: [CampusesController],
  providers: [CampusesService],
})
export class CampusesModule {}
