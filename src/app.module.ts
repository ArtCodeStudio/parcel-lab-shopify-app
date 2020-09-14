import { Module, DynamicModule, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShopifyModule, ShopifyModuleOptions } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
@Module({
  imports: [

  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
 
  static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CacheModule.register(options.cache),
        ShopifyModule.forRoot(options, database, passport),
        // InstagramModule.forRoot(options, database, passport),
        // FacebookModule.forRoot(options, database, passport),
      ],
    };
  }
}
