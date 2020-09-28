import { Test, TestingModule } from '@nestjs/testing';
import { ParcelLabSyncService } from './parcel-lab-sync.service';

describe('ParcelLabSyncService', () => {
  let service: ParcelLabSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelLabSyncService],
    }).compile();

    service = module.get<ParcelLabSyncService>(ParcelLabSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
