import { Model } from 'mongoose';
import { DebugService } from 'nest-shopify';
import { ParcelLabSettingsDocument } from '../interfaces/mongoose/settings.document';
import { ParcelLabSettings } from '../interfaces/settings';
export declare class SettingsService {
    protected readonly settingsModel: Model<ParcelLabSettingsDocument>;
    protected logger: DebugService;
    constructor(settingsModel: Model<ParcelLabSettingsDocument>);
    findByShopDomain(shopDomain: string): Promise<ParcelLabSettingsDocument>;
    createOrUpdate(settings: ParcelLabSettings): Promise<ParcelLabSettingsDocument>;
}
