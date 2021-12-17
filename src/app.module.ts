import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';

import { TypeormRegisterModule } from './typeorm.module';
import { CampusesModule } from './http/campuses/campuses.module';
import { ConfigRegisterModule } from './config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './http/users/users.module';

import { AllExceptionsFilter } from './filter/all-exception.filter';
import { ProgramsModule } from './http/programs/programs.module';
import { LoggerMiddleware } from './middleware/logs';
import { DbModulesModule } from './http/db-modules/db-modules.module';
import { PermissionsModule } from './http/permissions/permissions.module';

@Module({
  imports: [
    ConfigRegisterModule,
    TypeormRegisterModule,
    CampusesModule,
    AuthModule,
    UsersModule,
    ProgramsModule,
    DbModulesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'campuses', method: RequestMethod.GET });
  }
}
