import { Module, DynamicModule } from '@nestjs/common';
import { ShopifyModule, ShopifyModuleOptions, GetShopifyConnectMiddleware } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
import { ParcelLabApiService } from './parcel-lab-api/parcel-lab-api.service';
import { ParcelLabSyncService } from './parcel-lab-sync/parcel-lab-sync.service';

@Module({
  providers: [ParcelLabApiService, ParcelLabSyncService]
})
export class ParcelLabModule {
    static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule {
        return {
          module: ParcelLabModule,
          imports: [ShopifyModule.forRoot(options, database, passport)],
        };
    }
}
