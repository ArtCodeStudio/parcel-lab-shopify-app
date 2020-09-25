import { Module, DynamicModule } from '@nestjs/common';
import { ShopifyModule, ShopifyModuleOptions } from 'nest-shopify';
import { Mongoose } from 'mongoose';
import { PassportStatic } from 'passport';
import { ParcelLabSyncService } from './parcel-lab-sync/parcel-lab-sync.service';

@Module({
  providers: [ParcelLabSyncService]
})
export class ParcelLabModule {
    static forRoot(options: ShopifyModuleOptions, database: Mongoose, passport: PassportStatic): DynamicModule {
        return {
          module: ParcelLabModule,
          imports: [ShopifyModule.forRoot(options, database, passport)],
        };
    }
}
