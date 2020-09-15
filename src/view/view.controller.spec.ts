import { Test, TestingModule } from '@nestjs/testing';
import { ViewController } from './view.controller';

describe('App Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ViewController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ViewController = module.get<ViewController>(ViewController);
    expect(controller).toBeDefined();
  });
});
