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
    user.is_active = createUserDto.is_active || true;
    user.role_id = createUserDto.role_id;
    user.password_hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersRepository.save(user);
    const { id } = newUser;
    return this.usersRepository.findOne(id, { relations: ['role'] });
  }

  async findAll(): Promise<User[]> {
    const usersData = await this.usersRepository.find({ relations: ['role'] });
    let usersDataWithowPasswordInfo = [];

    if (usersData) {
      usersDataWithowPasswordInfo = usersData.map((userData) => {
        delete userData.password_hash;
        return userData;
      });
      return usersDataWithowPasswordInfo;
    }

    return usersData;
  }

  async findOne(id: string): Promise<User> {
    const userData = await this.usersRepository.findOneOrFail(id, {
      relations: ['role'],
    });

    if (userData) {
      delete userData.password_hash;
    }

    return userData;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
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
