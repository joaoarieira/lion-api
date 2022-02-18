import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleName } from '../roles/entities/role-name.enum';
import { StudentTutoringTutorsService } from '../student-tutoring-tutors/student-tutoring-tutors.service';
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
    private readonly studentTutoringTutorsService: StudentTutoringTutorsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.is_active = createUserDto.is_active ?? true;
    user.role_id = createUserDto.role_id;
    user.password_hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersRepository.save(user);

    return this.usersRepository.findOne(newUser.id, {
      relations: [
        'role',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['student_tutoring_professors', 'role'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id, {
      relations: [
        'role',
        'student_tutoring_professors',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
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
      relations: [
        'role',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { password, ...user } = updateUserDto;

    let newUser = new User();
    newUser = { ...newUser, ...user };

    if (password) {
      newUser.password_hash = bcrypt.hashSync(password, 10);
    }

    await this.usersRepository.update(id, newUser);

    return this.usersRepository.findOne(id, {
      relations: [
        'role',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneOrFail(id, {
      relations: ['student_tutoring_professors', 'role'],
    });

    if (user.role.name === RoleName.ADMIN) {
      throw new BadRequestException('cannot delete a user who is admin');
    }

    if (user.role.name === RoleName.PROFESSOR) {
      const canDelete =
        user.student_tutoring_professors.findIndex(
          (student_tutoring_professor) =>
            student_tutoring_professor.professor_id === id,
        ) < 0;

      if (!canDelete) {
        throw new BadRequestException(
          'cannot delete a professor that is related to a student_tutoring_tutor',
        );
      }
    }

    await this.studentTutoringTutorsService.removeAllByTutorId(id);
    await this.usersRepository.delete(id);
  }
}
