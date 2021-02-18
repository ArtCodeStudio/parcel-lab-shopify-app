import { ParcellabCourier } from './courier';
import { ParcellabArticle } from './article';

/**
 * All required keys must be supplied for every tracking
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#required-keys
 */
export interface ParcellabTrackingBase {
  articles: ParcellabArticle[];
  /**
   * Custom fields can be used to add additional content to the notifications that doesn't fit in any other field.
   * @see https://how.parcellab.works/docs/integration-quick-start/data-model#custom-fields
   */
  customFields?: any;
  /**
   * short code of the courier
   */
  courier: ParcellabCourier;
  /**
   * unique tracking number(s)
   */
  tracking_number: string | string[];
  /**
   * postal code
   */
  zip_code: string;
  /**
   * Destination country (e.g. DEU or DE)
   * ISO 3166-1 alpha-3 or alpha-2
   *
   */
  destination_country_iso3: string;
  /**
   * Order number;
   */
  orderNo?: string;
}
