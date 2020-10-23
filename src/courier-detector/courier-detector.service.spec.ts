import { Test, TestingModule } from '@nestjs/testing';
import { CourierDetectorService } from './courier-detector.service';

describe('CourierDetectorService', () => {
  let service: CourierDetectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourierDetectorService],
    }).compile();

    service = module.get<CourierDetectorService>(CourierDetectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
