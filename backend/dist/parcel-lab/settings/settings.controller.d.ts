import { DebugService } from 'nest-shopify';
import { SettingsService } from '../settings/settings.service';
import { ParcelLabSettings } from '../interfaces/settings';
export declare class SettingsController {
    protected readonly settings: SettingsService;
    protected log: DebugService;
    constructor(settings: SettingsService);
    get(res: any, session: any): Promise<any>;
    set(res: any, session: any, settings: ParcelLabSettings): Promise<any>;
    delete(res: any, session: any, settings: ParcelLabSettings): Promise<any>;
}
