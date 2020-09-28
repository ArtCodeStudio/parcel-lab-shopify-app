import { Connection } from 'mongoose';
import { ParcelLabSettingsSchema } from '../interfaces/mongoose/settings.schema';

export const ParcelLabSettingsModelProvider = {
      provide: 'ParcelLabSettingsModel',
      useFactory: (connection: Connection) => connection.model('parcel_lab_settings', ParcelLabSettingsSchema),
      inject: ['defaultDatabase'],
};