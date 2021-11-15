import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampusesModule } from './campuses/campuses.module';

@Module({
  imports: [CampusesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
