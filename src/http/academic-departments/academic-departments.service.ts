import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademicDepartmentDto } from './dto/create-academic-department.dto';
import { UpdateAcademicDepartmentDto } from './dto/update-academic-department.dto';
import { AcademicDepartment } from './entities/academic-department.entity';

@Injectable()
export class AcademicDepartmentsService {
  constructor(
    @InjectRepository(AcademicDepartment)
    private readonly academicDepartmentsRepository: Repository<AcademicDepartment>,
  ) {}

  create(
    createAcademicDepartmentDto: CreateAcademicDepartmentDto,
  ): Promise<CreateAcademicDepartmentDto> {
    const academicDepartment = new AcademicDepartment();
    academicDepartment.name = createAcademicDepartmentDto.name;
    academicDepartment.campus_id = createAcademicDepartmentDto.campus_id;

    return this.academicDepartmentsRepository.save(academicDepartment);
  }

  findAll(): Promise<CreateAcademicDepartmentDto[]> {
    return this.academicDepartmentsRepository.find();
  }

  findOne(id: string): Promise<CreateAcademicDepartmentDto> {
    return this.academicDepartmentsRepository.findOne(id);
  }

  update(id: string, updateAcademicDepartmentDto: UpdateAcademicDepartmentDto) {
    return this.update(id, updateAcademicDepartmentDto);
  }

  async remove(id: string): Promise<void> {
    await this.academicDepartmentsRepository.delete(id);
  }
}
