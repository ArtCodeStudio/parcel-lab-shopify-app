import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

import { ShopifyModuleOptions } from 'nest-shopify';

const shopifyModuleOptions: ShopifyModuleOptions = {
  app: ConfigService.app,
  shopify: ConfigService.shopify,
  charges: ConfigService.charges,
  redis: ConfigService.redis,
  mongodb: ConfigService.mongodb,
  elasticsearch: ConfigService.elasticsearch,
  swiftype: ConfigService.swiftype,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log('http://localhost:3000')
  await app.listen(3000);
}
bootstrap();
