import { Module } from '@nestjs/common';
import { ClassSchedulesService } from './class-schedules.service';
import { ClassSchedulesController } from './class-schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSchedule } from './entities/class-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassSchedule])],
  controllers: [ClassSchedulesController],
  providers: [ClassSchedulesService],
})
export class ClassSchedulesModule {}
