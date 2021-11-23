import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeormRegisterModule } from './typeorm.module';
import { CampusesModule } from './http/campuses/campuses.module';
import { ConfigRegisterModule } from './config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './http/users/users.module';
import { AcademicDepartmentsModule } from './http/academic-departments/academic-departments.module';

@Module({
  imports: [
    ConfigRegisterModule,
    TypeormRegisterModule,
    CampusesModule,
    AcademicDepartmentsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
