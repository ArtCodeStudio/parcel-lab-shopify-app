export interface ParcelLabSettingsLanguageFallback {
  from: string;
  to: string;
}

export interface ParcelLabSettings {
  user: number;
  token: string;
  shop_domain?: string;
  /**
   * If active, the app tries to derive the courier by the title of the shipping method selected by the customer during the ordering process.
   * We recommend to leave this option disabled and to activate it only if there are problems with the courier sent to ParcelLab
   */
  prefer_checkout_shipping_method: boolean;
  languageFallbacks: ParcelLabSettingsLanguageFallback[];

  customFields?: {
    'no-notify': boolean;
  };
}
