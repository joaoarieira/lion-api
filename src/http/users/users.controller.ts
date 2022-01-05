import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesCanAccess } from '../../decorators/roles-can-access.decorator';
import { RoleName } from '../roles/entities/role-name.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RolesCanAccess(RoleName.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
