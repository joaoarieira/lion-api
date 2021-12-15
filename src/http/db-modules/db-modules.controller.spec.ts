import { Test, TestingModule } from '@nestjs/testing';
import { DbModulesController } from './db-modules.controller';
import { DbModulesService } from './db-modules.service';

describe('DbModulesController', () => {
  let controller: DbModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbModulesController],
      providers: [DbModulesService],
    }).compile();

    controller = module.get<DbModulesController>(DbModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
