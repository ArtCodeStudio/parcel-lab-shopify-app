import { DynamicModule } from '@nestjs/common';
import { ShopifyModuleOptions } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
export declare class AppModule {
    static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule;
}
