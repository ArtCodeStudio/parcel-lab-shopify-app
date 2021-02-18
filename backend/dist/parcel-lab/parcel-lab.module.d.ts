import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { ShopifyModuleOptions } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
export declare class ParcelLabModule {
    static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule;
    configure(consumer: MiddlewareConsumer): void;
}
