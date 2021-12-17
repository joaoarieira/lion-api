import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Campus } from 'src/http/campuses/entities/campus.entity';
import { Program } from 'src/http/programs/entities/program.entity';
import { DbModule } from 'src/http/db-modules/entities/db-module.entity';
import { Permission } from 'src/http/permissions/entities/permission.entity';
import { Role } from 'src/http/roles/entities/role.entity';

export const typeorm = () => ({
  typeorm: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Campus, Program, DbModule, Permission, Role],
  },
});

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions() {
    return this.configService.get('typeorm');
  }
}
