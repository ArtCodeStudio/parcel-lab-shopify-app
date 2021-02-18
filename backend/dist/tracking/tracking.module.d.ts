import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { ShopifyModuleOptions } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
export declare class TrackingModule {
    static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule;
    configure(consumer: MiddlewareConsumer): void;
}
