import { Module } from '@nestjs/common';
import { CampusesModule } from './campuses/campuses.module';
import { ConfigRegisterModule } from './config.module';
import { TypeormRegisterModule } from './typeorm.module';

@Module({
  imports: [TypeormRegisterModule, ConfigRegisterModule, CampusesModule],
})
export class AppModule {}
