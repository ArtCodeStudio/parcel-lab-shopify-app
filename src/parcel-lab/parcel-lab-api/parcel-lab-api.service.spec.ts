import { Test, TestingModule } from '@nestjs/testing';
import { ParcelLabApiService } from './parcel-lab-api.service';

describe('ParcelLabApiService', () => {
  let service: ParcelLabApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelLabApiService],
    }).compile();

    service = module.get<ParcelLabApiService>(ParcelLabApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
