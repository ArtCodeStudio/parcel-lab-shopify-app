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

  it('"H1000730000824301047" should be detected as "hermes"', () => {
    const courier = service.getCourier("H1000730000824301047");
    expect(courier).toBe("hermes");
  });

  it('"Z6100130652673000" should be detected as "colisprivee"', () => {
    const courier = service.getCourier("Z6100130652673000");
    expect(courier).toBe("colisprivee");
  });

  it('"CR236025058DE" should be detected as "dhl-germany"', () => {
    const courier = service.getCourier("CR236025058DE");
    expect(courier).toBe("dhl-germany");
  });
  
  
});
