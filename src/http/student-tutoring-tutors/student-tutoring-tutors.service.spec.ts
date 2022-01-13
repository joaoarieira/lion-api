import { Test, TestingModule } from '@nestjs/testing';
import { StudentTutoringTutorsService } from './student-tutoring-tutors.service';

describe('StudentTutoringTutorsService', () => {
  let service: StudentTutoringTutorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentTutoringTutorsService],
    }).compile();

    service = module.get<StudentTutoringTutorsService>(
      StudentTutoringTutorsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
