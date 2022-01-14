import { Test, TestingModule } from '@nestjs/testing';
import { StudentTutoringsController } from './student-tutorings.controller';
import { StudentTutoringsService } from './student-tutorings.service';

describe('StudentTutoringsController', () => {
  let controller: StudentTutoringsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentTutoringsController],
      providers: [StudentTutoringsService],
    }).compile();

    controller = module.get<StudentTutoringsController>(
      StudentTutoringsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
