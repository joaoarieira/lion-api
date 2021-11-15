import { Module } from '@nestjs/common';
import { CampusesModule } from './campuses/campuses.module';

@Module({
  imports: [CampusesModule],
})
export class AppModule {}
