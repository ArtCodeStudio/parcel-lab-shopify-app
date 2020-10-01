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