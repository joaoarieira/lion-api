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
import { RolesModule } from './http/roles/roles.module';
import { RoleModulePermissionsModule } from './http/role-module-permissions/role-module-permissions.module';
import { StudentTutoringsModule } from './http/student-tutorings/student-tutorings.module';
import { StudentTutoringTutorsModule } from './http/student-tutoring-tutors/student-tutoring-tutors.module';
import { StudentTutoringProgramsModule } from './http/student-tutoring-programs/student-tutoring-programs.module';
import { ClassSchedulesModule } from './http/class-schedules/class-schedules.module';

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
    RolesModule,
    RoleModulePermissionsModule,
    StudentTutoringsModule,
    StudentTutoringTutorsModule,
    StudentTutoringProgramsModule,
    ClassSchedulesModule,
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
