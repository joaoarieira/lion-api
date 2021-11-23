import { Test, TestingModule } from '@nestjs/testing';
import { AcademicDepartmentsService } from './academic-departments.service';

describe('AcademicDepartmentsService', () => {
  let service: AcademicDepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicDepartmentsService],
    }).compile();

    service = module.get<AcademicDepartmentsService>(
      AcademicDepartmentsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
