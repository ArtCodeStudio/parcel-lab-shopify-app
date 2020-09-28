import { Module, DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { ShopifyModule, ShopifyModuleOptions, BodyParserJsonMiddleware } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
import { ParcelLabSyncService } from './sync/parcel-lab-sync.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { ParcelLabSettingsModelProvider } from './settings/settings.model.provider';

@Module({
  providers: [
    ParcelLabSyncService,
    SettingsService,
    ParcelLabSettingsModelProvider
  ],
  controllers: [SettingsController]
})
export class ParcelLabModule {
    static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule {
        return {
          module: ParcelLabModule,
          imports: [ShopifyModule.forRoot(options, database, passport)],
        };
    }

    configure(consumer: MiddlewareConsumer) {
      consumer

      .apply(BodyParserJsonMiddleware)
      .forRoutes(SettingsController)
    }
}
