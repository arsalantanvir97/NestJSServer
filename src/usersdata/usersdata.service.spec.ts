import { Test, TestingModule } from '@nestjs/testing';
import { UsersdataService } from './usersdata.service';

describe('UsersdataService', () => {
  let service: UsersdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersdataService],
    }).compile();

    service = module.get<UsersdataService>(UsersdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
