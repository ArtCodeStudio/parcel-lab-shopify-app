export interface ParcelLabSettings {
    user: number;
    token: string;
    shop_domain?: string;
    prefer_checkout_shipping_method: boolean;
    fallback_detect_carrier_by_tracking_more: boolean;
    tracking_more_token: string;
}
