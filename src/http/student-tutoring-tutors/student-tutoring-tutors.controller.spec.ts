import { Test, TestingModule } from '@nestjs/testing';
import { StudentTutoringTutorsController } from './student-tutoring-tutors.controller';
import { StudentTutoringTutorsService } from './student-tutoring-tutors.service';

describe('StudentTutoringTutorsController', () => {
  let controller: StudentTutoringTutorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentTutoringTutorsController],
      providers: [StudentTutoringTutorsService],
    }).compile();

    controller = module.get<StudentTutoringTutorsController>(StudentTutoringTutorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
