import { TrackingMoreCourierDetectResponse } from './interfaces';
export declare class TrackingMoreService {
    protected token: string;
    constructor(token: string);
    detectCarrier(tracking_number: string): Promise<TrackingMoreCourierDetectResponse>;
    protected post(url: string, data: any, token: string, responseType?: string): Promise<any>;
    protected get(url: string, params: any, token: string, responseType?: string): Promise<any>;
    request(method: 'post' | 'get' | 'delete' | 'put', url: string, data: any, token: string, responseType?: string): Promise<string>;
}
