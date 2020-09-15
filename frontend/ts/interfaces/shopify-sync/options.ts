export interface ISyncOptions {
  syncToDb: boolean;
  syncToEs: boolean;
  syncToSwiftype: boolean;
  includeOrders: boolean;
  includeTransactions: boolean;
  includeProducts: boolean;
  includePages: boolean;
  includeCustomCollections: boolean;
  includeSmartCollections: boolean;
  resync: boolean;
  cancelExisting: boolean;
}
