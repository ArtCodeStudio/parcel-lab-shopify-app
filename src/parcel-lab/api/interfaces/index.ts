// TODO add more allowed couriers
export type ParcellabCourier = "dhl-germany" |"dpd-de" | "hermes-de" | string;

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

/**
 * Orders cannot be explicitly created in parcelLab, but only implicitly.
 * For each tracking in an order, simply a orderNo is given.
 * This orderNo then links all trackings together and consolidate communications via email, SMS etc and also the tracking page.
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#creating-orders
 */
export interface ParcellabOrderBase extends Partial<ParcellabTrackingBase> {
    /**
     * id-of-delivery-before-tracking-numbe
     */
    xid?: string;
    /**
     * Order number;
     */
    orderNo: string;
}

/**
 * If several shops (e.g. shops with multiple domains, dedicated shops for specific countries, or otherwise individual CI) are used within one account, each tracking is assigned to a shop using the key client.
 */
export interface ParcellabMultishop {
    /**
     * Client (Mandant in German) of the tracking in internal encoding.
     * E.g. the shop name
     * 
     * @see https://how.parcellab.works/docs/integration-quick-start/data-model#multi-shop-setup
     */
    client?: string;
}

/**
 * To be able to send out sensible notifications to customers, the following keys are required/ strongly recommended.
 */
export interface ParcellabNotifications {

    /**
     * name of the recipient used in notifications (incl. salutation)
     */
    recipient_notification?: string;

    /**
     * name of the recipient used in portal
     */
    recipient?: string;

    /**
     * email of recipient
     */
    email: string;

    /**
     * street address of delivery
     */
    street: string;

    /**
     * city of delivery
     */
    city: string;

    /**
     * phone number of recipient
     */
    phone: string;

    /**
     * ISO code of language used by recipient (e.g. de for German)
     */
    language_iso3: string;
}

/**
 * These special keys alter how the system handles the trackings.
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#special-keys
 */
export interface ParcellabSpecialKeys {
    /**
     * If true the delivery is handled as a return,
     * i.e. by default no communication is sent to the set recipient,
     * dispatch delays will not be monitored, and the tracking will not be considered for general reporting
     */
    return: boolean;
    /**
     * If true delivery is cancelled, i.e. no communication is sent to the set recipient, all monitoring and reporting is disabled
     */
    cancelled: boolean;
}

/**
 * These additional keys can be used to further individualise notifications.
 * 
 * Note: All dates can be either be in the format YYYY-MM-DD or YYYY-MM-DD HH:mm:ss
 * 
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#optional-keys
 */
export interface ParcellabOptionalKeys {
    /**
     * internal delivery number
     */
    deliveryNo: string;
    /**
     * internal customer number
     */
    customerNo: string;
    /**
     * weight of the package
     */
    weight: string;
    /**
     * product or service level from courier
     */
    courierServiceLevel: string;
    /**
     * warehouse from where delivery was shipped
     */
    warehouse: string;
    /**
     * marketplace used for sale
     */
    market: string;
    /**
     * whether the shipment is complete
     */
    complete: boolean;
    /**
     * whether the shipment has an upgrade or individualisation
     */
    upgrade: boolean;
    /**
     * the C.O.D. (Nachnahme) amount
     */
    cashOnDelivery: number;
    /**
     * whether the shipment is a branch delivery
     */
    branchDelivery: boolean;
    /**
     * alternative status link
     */
    statuslink: string;
    /**
     * date of ordering by customer
     */
    order_date: Date | number;
    /**
     * announced dispatch/ send date
     */
    send_date: Date | number;
    /**
     * announced delivery date
     */
    announced_delivery_date: Date;
}

/**
 * A list of articles allows you to specify the detailed contents of a delivery by defining for each item in the list the quantity, article number, and article name.
 * It is written into the field articles.
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#article-list
 */
export interface ParcellabArticle {
    articleNo: string;
    articleName: string;
    articleCategory?: string;
    articleUrl?: string;
    articleImageUrl?: string;
    quantity?: number;
}

export interface ParcellabTracking extends ParcellabTrackingBase, Partial<ParcellabMultishop>, Partial<ParcellabNotifications>, Partial<ParcellabSpecialKeys>, Partial<ParcellabOptionalKeys> {

}

export interface ParcellabOrder extends ParcellabOrderBase, Partial<ParcellabMultishop>, Partial<ParcellabNotifications>, Partial<ParcellabSpecialKeys>, Partial<ParcellabOptionalKeys> {

}