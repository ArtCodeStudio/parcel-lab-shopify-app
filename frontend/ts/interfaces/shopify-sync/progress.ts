import { IOrderSyncProgress } from './order';
import { IProductSyncProgress } from './product';
import { ISyncOptions } from './options';

export interface ISyncProgress {
  shop: string;
  options: ISyncOptions;
  orders?: IOrderSyncProgress;
  products?: IProductSyncProgress;
  createdAt: Date;
  updatedAt: Date;
  state: 'running' | 'failed' | 'cancelled' | 'success' | 'starting' | 'ending';
  lastError: string | null;
}
