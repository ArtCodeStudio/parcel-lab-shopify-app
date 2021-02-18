import { ParcellabTracking, ParcellabOrder, ParcellabSearchResponse } from './interfaces';
export declare class ParcelLabApi {
    protected user: number;
    protected token: string;
    constructor(user: number, token: string);
    createOrUpdateTracking(payload: ParcellabTracking, test: boolean): Promise<string[]>;
    createOrUpdateOrder(payload: ParcellabOrder, test: boolean): Promise<string[]>;
    search(search?: string, page?: number, size?: number): Promise<ParcellabSearchResponse>;
    protected checkPayload(payload: ParcellabOrder | ParcellabTracking, endpoint: 'tracking' | 'order'): {
        error: string | null;
        isValid?: boolean;
    };
    protected hasMultipleTrackingNumbers(payload: ParcellabOrder | ParcellabTracking): string;
    protected multiplyOnTrackingNumber(payload: ParcellabOrder | ParcellabTracking): any[];
    protected guessCourier(input: string, destinationCountryIso3?: string): string;
    protected postTrackingToParcelLabAPI(payload: ParcellabOrder | ParcellabTracking, user: number, token: string, test: boolean): Promise<any>;
    protected postOrderToParcelLabAPI(payload: ParcellabOrder | ParcellabTracking, user: number, token: string, test: boolean): Promise<any>;
    protected validateMostRecentTracking(user: number, token: string): Promise<any>;
    protected post(url: string, data: any, user: number, token: string, responseType?: string): Promise<any>;
    protected get(url: string, params: any, user: number, token: string, responseType?: string): Promise<any>;
    protected request(method: 'post' | 'get', url: string, data: any, user: number, token: string, responseType?: string): Promise<string>;
}
