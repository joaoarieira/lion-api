import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CampusesModule } from './campuses/campuses.module';
import { ConfigRegisterModule } from './config.module';
import { TypeormRegisterModule } from './typeorm.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeormRegisterModule,
    ConfigRegisterModule,
    CampusesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
