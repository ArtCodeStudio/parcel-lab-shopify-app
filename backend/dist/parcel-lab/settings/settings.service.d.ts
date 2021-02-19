import { Model } from 'mongoose';
import { DebugService, EventService, IShopifyConnect } from 'nest-shopify';
import { ParcelLabSettingsDocument } from '../interfaces/mongoose/settings.document';
import { ParcelLabSettings } from '../interfaces/settings';
export declare class SettingsService {
    protected readonly settingsModel: Model<ParcelLabSettingsDocument>;
    protected readonly events: EventService;
    protected log: DebugService;
    constructor(settingsModel: Model<ParcelLabSettingsDocument>, events: EventService);
    protected onUninstalled(myShopifyDomain: IShopifyConnect['shop']['myshopify_domain']): Promise<any>;
    protected onInstalled(shopifyConnect: IShopifyConnect): Promise<ParcelLabSettingsDocument>;
    setDefaults(shopDomain: string): Promise<ParcelLabSettingsDocument>;
    findByShopDomain(shopDomain: string): Promise<ParcelLabSettingsDocument>;
    createOrUpdate(settings: ParcelLabSettings): Promise<ParcelLabSettingsDocument>;
    delete(shopDomain: string): Promise<any>;
}
