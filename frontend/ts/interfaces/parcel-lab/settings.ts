export interface ParcelLabSettings {
  user: number;
  token: string;
  /**
   * If true the app tries to parse the carier from the shipping method title the customer has selected in the checkout process.
   * Only use this only if the transferred carier is faulty, we recommend to leave this option disabled.
   */
  prefer_checkout_shipping_method: boolean;
}
