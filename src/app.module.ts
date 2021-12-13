import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { TypeormRegisterModule } from './typeorm.module';
import { CampusesModule } from './http/campuses/campuses.module';
import { ConfigRegisterModule } from './config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './http/users/users.module';

import { AllExceptionsFilter } from './filter/all-exception.filter';
import { ProgramsModule } from './http/programs/programs.module';

@Module({
  imports: [
    ConfigRegisterModule,
    TypeormRegisterModule,
    CampusesModule,
    AuthModule,
    UsersModule,
    ProgramsModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
