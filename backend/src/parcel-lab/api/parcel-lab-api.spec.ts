// Port test? https://bitbucket.org/parcellab/sdk-node/src/master/try.js

import { Test, TestingModule } from '@nestjs/testing';
import { ParcelLabApi } from './parcel-lab-api';

describe('ParcelLabApi', () => {
  let service: ParcelLabApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelLabApi],
    }).compile();

    service = module.get<ParcelLabApi>(ParcelLabApi);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
