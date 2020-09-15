import Debug from 'debug';

export class ShopifyApiService {
  public static instance?: ShopifyApiService;
  protected debug = Debug('services:ShopifyApiService');

  constructor() {
    if (ShopifyApiService.instance) {
      return ShopifyApiService.instance;
    }
    ShopifyApiService.instance = this;
  }
}
