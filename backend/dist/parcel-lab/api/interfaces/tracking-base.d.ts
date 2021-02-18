import { ParcellabCourier } from './courier';
import { ParcellabArticle } from './article';
export interface ParcellabTrackingBase {
    articles: ParcellabArticle[];
    customFields?: any;
    courier: ParcellabCourier;
    tracking_number: string | string[];
    zip_code: string;
    destination_country_iso3: string;
    orderNo?: string;
}
