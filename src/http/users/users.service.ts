import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.is_active = createUserDto.is_active || true;
    user.role_id = createUserDto.role_id;
    user.password_hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersRepository.save(user);
    const { id } = newUser;
    return this.usersRepository.findOne(id, { relations: ['role'] });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  findOne(): Promise<User> {
    return this.usersRepository.findOne({ relations: ['role'] });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
      relations: ['role'],
    });
  }
}
