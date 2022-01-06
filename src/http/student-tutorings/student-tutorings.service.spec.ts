import { Test, TestingModule } from '@nestjs/testing';
import { StudentTutoringsService } from './student-tutorings.service';

describe('StudentTutoringsService', () => {
  let service: StudentTutoringsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentTutoringsService],
    }).compile();

    service = module.get<StudentTutoringsService>(StudentTutoringsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
