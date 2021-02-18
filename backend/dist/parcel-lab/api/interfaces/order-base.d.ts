import { ParcellabTrackingBase } from './tracking-base';
export interface ParcellabOrderBase extends Partial<ParcellabTrackingBase> {
    xid?: string;
    orderNo: string;
}
