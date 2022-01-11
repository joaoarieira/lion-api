import { Test, TestingModule } from '@nestjs/testing';
import { StudentTutoringProgramsService } from './student-tutoring-programs.service';

describe('StudentTutoringProgramsService', () => {
  let service: StudentTutoringProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentTutoringProgramsService],
    }).compile();

    service = module.get<StudentTutoringProgramsService>(
      StudentTutoringProgramsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
