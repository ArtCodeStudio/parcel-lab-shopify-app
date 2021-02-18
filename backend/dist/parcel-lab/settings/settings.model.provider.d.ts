import { Connection } from 'mongoose';
export declare const ParcelLabSettingsModelProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("mongoose").Document<any>>;
    inject: string[];
};
