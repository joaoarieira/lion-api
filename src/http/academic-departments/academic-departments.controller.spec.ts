import { Test, TestingModule } from '@nestjs/testing';
import { AcademicDepartmentsController } from './academic-departments.controller';
import { AcademicDepartmentsService } from './academic-departments.service';

describe('AcademicDepartmentsController', () => {
  let controller: AcademicDepartmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicDepartmentsController],
      providers: [AcademicDepartmentsService],
    }).compile();

    controller = module.get<AcademicDepartmentsController>(
      AcademicDepartmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
