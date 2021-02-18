import { SettingsService } from './settings.service';
import { ParcelLabSettings } from '../interfaces/settings';
export declare class SettingsController {
    protected readonly settings: SettingsService;
    constructor(settings: SettingsService);
    get(res: any, session: any): Promise<any>;
    set(res: any, session: any, req: any, settings: ParcelLabSettings): Promise<any>;
}
