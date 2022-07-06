import { Test, TestingModule } from '@nestjs/testing';
import { UsersdataController } from './usersdata.controller';

describe('Usersdata Controller', () => {
  let controller: UsersdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersdataController],
    }).compile();

    controller = module.get<UsersdataController>(UsersdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
