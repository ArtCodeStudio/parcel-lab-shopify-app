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

  // hermes
  it('"H1000730000824301047" should be detected as "hermes"', () => {
    const courier = service.getCourier("H1000730000824301047");
    expect(courier).toBe("hermes");
  });

  // colisprivee
  it('"Z6100130652673000" should be detected as "colisprivee"', () => {
    const courier = service.getCourier("Z6100130652673000");
    expect(courier).toBe("colisprivee");
  });

  // dhl-germany
  it('"CR236025058DE" should be detected as "dhl-germany"', () => {
    const courier = service.getCourier("CR236025058DE");
    expect(courier).toBe("dhl-germany");
  });

  it('"00340434463400054439" should be detected as "dhl-germany"', () => {
    const courier = service.getCourier("00340434463400054439");
    expect(courier).toBe("dhl-germany");
  });
  
  // dpd
  it('"09445440528278N" should be detected as "dpd"', () => {
    const courier = service.getCourier("09445440528278N");
    expect(courier).toBe("dpd");
  });
  
  it('"09445440528275T" should be detected as "dpd"', () => {
    const courier = service.getCourier("09445440528275T");
    expect(courier).toBe("dpd");
  });

  it('"09445440528213M" should be detected as "dpd"', () => {
    const courier = service.getCourier("09445440528213M");
    expect(courier).toBe("dpd");
  });
  
});
