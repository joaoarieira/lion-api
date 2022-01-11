import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Campus } from '../http/campuses/entities/campus.entity';
import { Program } from '../http/programs/entities/program.entity';
import { DbModule } from '../http/db-modules/entities/db-module.entity';
import { Permission } from '../http/permissions/entities/permission.entity';
import { Role } from '../http/roles/entities/role.entity';
import { RoleModulePermission } from '../http/role-module-permissions/entities/role-module-permission.entity';
import { User } from '../http/users/entities/user.entity';
import { StudentTutoring } from '../http/student-tutorings/entities/student-tutoring.entity';
import { StudentTutoringTutor } from '../http/student-tutoring-tutors/entities/student-tutoring-tutor.entity';
import { StudentTutoringProgram } from 'src/http/student-tutoring-programs/entities/student-tutoring-program.entity';

export const typeorm = () => ({
  typeorm: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
      Campus,
      Program,
      DbModule,
      Permission,
      Role,
      RoleModulePermission,
      User,
      StudentTutoring,
      StudentTutoringTutor,
      StudentTutoringProgram,
    ],
  },
});

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions() {
    return this.configService.get('typeorm');
  }
}
