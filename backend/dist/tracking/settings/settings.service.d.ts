import { Model } from 'mongoose';
import { DebugService, EventService } from 'nest-shopify';
import { ParcelLabSettingsDocument } from '../interfaces/mongoose/settings.document';
import { ParcelLabSettings } from '../interfaces/settings';
export declare class SettingsService {
    protected readonly settingsModel: Model<ParcelLabSettingsDocument>;
    protected readonly shopifyEvents: EventService;
    protected logger: DebugService;
    constructor(settingsModel: Model<ParcelLabSettingsDocument>, shopifyEvents: EventService);
    findByShopDomain(shopDomain: string): Promise<any>;
    createOrUpdate(settings: ParcelLabSettings): Promise<any>;
    deleteByShopDomain(shopDomain: string): Promise<any>;
}
