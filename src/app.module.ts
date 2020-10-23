import { Module, DynamicModule, CacheModule } from '@nestjs/common';
import { ViewController } from './view/view.controller';
import { ViewService } from './view/view.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config';

import { ShopifyModule, ShopifyModuleOptions } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [ViewController],
  providers: [ViewService],
})

export class AppModule {
 
  static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CacheModule.register(options.cache),
        ShopifyModule.forRoot(options, database, passport),
        TrackingModule.forRoot(options, database, passport),
      ],
    };
  }
}
