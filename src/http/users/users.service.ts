import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleName } from '../roles/entities/role-name.enum';
import { RolesService } from '../roles/roles.service';
import { CreateStudentTutoringTutorDto } from '../student-tutoring-tutors/dto/create-student-tutoring-tutor.dto';
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
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.student_tutorings_ids !== undefined) {
      const role = await this.rolesService.findOne(createUserDto.role_id);
      if (role.name !== RoleName.STUDENT_TUTOR) {
        throw new BadRequestException('this user cannot be a student tutor');
      }
    }

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.is_active = createUserDto.is_active ?? true;
    user.role_id = createUserDto.role_id;
    user.password_hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersRepository.save(user);

    const { id: user_id } = newUser;

    if (createUserDto.student_tutorings_ids) {
      for (const student_tutoring_id of createUserDto.student_tutorings_ids) {
        const studentTutoringTutorDto = {
          student_tutoring_id,
          tutor_id: user_id,
        } as CreateStudentTutoringTutorDto;

        await this.studentTutoringTutorsService.create(studentTutoringTutorDto);
      }
    }

    return this.usersRepository.findOne(user_id, {
      relations: [
        'role',
        'student_tutorings',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['role', 'student_tutorings'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id, {
      relations: [
        'role',
        'student_tutorings',
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
        'student_tutorings',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { role: userRole } = await this.usersRepository.findOneOrFail(id, {
      relations: ['role'],
    });

    const { student_tutorings_ids, password, ...user } = updateUserDto;

    let newUser = new User();
    newUser = { ...newUser, ...user };

    if (password) {
      newUser.password_hash = bcrypt.hashSync(password, 10);
    }

    if (student_tutorings_ids !== undefined) {
      if (userRole.name !== RoleName.STUDENT_TUTOR) {
        throw new BadRequestException('this user is not a student tutor');
      }

      await this.studentTutoringTutorsService.removeAllByTutorId(id);

      for (const student_tutoring_id of student_tutorings_ids) {
        const studentTutoringTutorDto = {
          student_tutoring_id,
          tutor_id: id,
        } as CreateStudentTutoringTutorDto;

        await this.studentTutoringTutorsService.create(studentTutoringTutorDto);
      }
    }

    await this.usersRepository.update(id, newUser);

    return this.usersRepository.findOne(id, {
      relations: [
        'role',
        'student_tutorings',
        'student_tutoring_tutors',
        'student_tutoring_tutors.student_tutoring',
      ],
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneOrFail(id, {
      relations: ['student_tutorings', 'role'],
    });

    if (user.role.name === RoleName.ADMIN) {
      throw new BadRequestException('cannot delete a user who is admin');
    }

    if (user.role.name === RoleName.PROFESSOR) {
      const canDelete =
        user.student_tutorings.filter(
          (student_tutoring) => student_tutoring.professor_id === id,
        ).length <= 0;

      if (!canDelete) {
        throw new BadRequestException(
          'cannot delete a professor that is related to a student_tutoring',
        );
      }
    }

    await this.studentTutoringTutorsService.removeAllByTutorId(id);
    await this.usersRepository.delete(id);
  }
}
