import { IShopifyObject } from './base';

export interface IProductOption extends IShopifyObject {
  /**
   * The unique numeric identifier for the product.
   */
  product_id: number;

  /**
   * The name of the option.
   */
  name: string;

  /**
   * The order of the product variant in the list of product variants. 1 is the first position.
   */
  position: number;

  /**
   * The values for the options.
   */
  values: string[];
}
