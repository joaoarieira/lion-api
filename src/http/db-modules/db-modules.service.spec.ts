import { Test, TestingModule } from '@nestjs/testing';
import { DbModulesService } from './db-modules.service';

describe('ModulesService', () => {
  let service: DbModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesService],
    }).compile();

    service = module.get<ModulesService>(ModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
