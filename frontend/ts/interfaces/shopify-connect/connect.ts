import { TRoles } from './role';
import { IShopifyShop } from '../shopify-api/shop';

export interface IShopifyConnect {
  _id: string;
  shopifyID: number;
  myshopify_domain: string;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
  roles: TRoles;
  shop: IShopifyShop;
}
