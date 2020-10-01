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