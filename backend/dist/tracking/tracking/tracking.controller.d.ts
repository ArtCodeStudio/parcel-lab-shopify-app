import { ParcelLabTrackingService } from './tracking.service';
export declare class TrackingController {
    protected readonly tracking: ParcelLabTrackingService;
    constructor(tracking: ParcelLabTrackingService);
    get(res: any, session: any, search?: string, page?: number, size?: number): void;
}
