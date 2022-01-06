import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    user.is_active = createUserDto.is_active ?? true;
    user.role_id = createUserDto.role_id;
    user.password_hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersRepository.save(user);
    const { id } = newUser;
    return this.usersRepository.findOne(id, { relations: ['role'] });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id, {
      relations: ['role'],
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
      select: [
        'id',
        'role_id',
        'name',
        'email',
        'is_active',
        'created_at',
        'updated_at',
        'password_hash',
      ],
      relations: ['role'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
  }
}
