import { Test, TestingModule } from '@nestjs/testing';
import { ParcelLabTrackingService } from './tracking.service';

describe('ParcelLabTrackingService', () => {
  let service: ParcelLabTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelLabTrackingService],
    }).compile();

    service = module.get<ParcelLabTrackingService>(ParcelLabTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
