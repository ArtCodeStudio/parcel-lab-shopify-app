import { Test, TestingModule } from '@nestjs/testing';
import { TrackingMoreService } from './tracking-more.service';

describe('TrackingMoreService', () => {
  let service: TrackingMoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingMoreService],
    }).compile();

    service = module.get<TrackingMoreService>(TrackingMoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
