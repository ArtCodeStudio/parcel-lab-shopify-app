import { Injectable, Inject } from '@nestjs/common';
import {
    ParcelLabApi,
    ParcellabOrder,
    ParcellabArticle,
    ParcellabSearchResponse,
} from 'parcellab';
import { ParcelLabSettings } from '../interfaces'
import { SettingsService } from '../settings/settings.service';
import { TrackingMoreService } from '../tracking-more/tracking-more.service';
import {
    DebugService,
    EventService,
    Interfaces,
    ShopService,
    ProductsService,
    OrdersService,
    ShopifyConnectService,
    IShopifyConnect,
    SHOPIFY_MODULE_OPTIONS,
    ShopifyModuleOptions,
    CheckoutsService,
} from 'nest-shopify';

// Options TODO make this configurable?
const PREFER_SKU = true;

type AnyWebhookOrder = Interfaces.WebhooksReponse.WebhookOrdersFulfilled | Interfaces.WebhooksReponse.WebhookOrdersPaid | Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled | Interfaces.WebhooksReponse.WebhookOrdersUpdated | Interfaces.WebhooksReponse.WebhookOrdersCreate;

type AnyWebhookFulfillment =  Interfaces.WebhooksReponse.WebhookFulfillmentCreate | Interfaces.WebhooksReponse.WebhookFulfillmentUpdate

@Injectable()
export class ParcelLabTrackingService {

    protected logger = new DebugService('parcelLab:ParcelLabTrackingService');

    protected testMode = false;

    constructor(
        @Inject(SHOPIFY_MODULE_OPTIONS) protected readonly shopifyModuleOptions: ShopifyModuleOptions,
        protected readonly shopifyEvents: EventService,
        protected readonly shopify: ShopifyConnectService,
        protected readonly parcelLabSettings: SettingsService,
        protected readonly shop: ShopService,
        protected readonly product: ProductsService,
        protected readonly checkout: CheckoutsService,
        protected readonly order: OrdersService,
    ) {
        this.testMode = !!this.shopifyModuleOptions.app.test;
        this.addEventListeners();
    }

    /**
     * Checking last transfer via API
     * @see https://how.parcellab.works/docs/integration-quick-start/creating-a-new-tracking/api#checking-last-transfer-via-api
     * @param myshopifyDomain 
     * @param search Any search string
     * @param page What page to show (pagination), defaults to 0
     * @param size Number of entries on a page, defaults to 24
     */
    public async list(myshopifyDomain: string, search?: string, page?: number, size?: number): Promise<ParcellabSearchResponse> {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for: %s', myshopifyDomain);
            return;
        }
        const api = new ParcelLabApi(settings.user, settings.token);
        return api.search(search, page, size);
    }

    protected addEventListeners() {
        // draft orders
        // this.shopifyEvents.on(`webhook:draft_orders/create`, this.onDraftOrderCreate.bind(this));
        // this.shopifyEvents.on(`webhook:draft_orders/update`, this.onDraftOrderDelete.bind(this));
        // this.shopifyEvents.on(`webhook:draft_orders/update`, this.onDraftOrderUpdate.bind(this));

        // orders
        this.shopifyEvents.on(`webhook:orders/cancelled`, this.onOrderCancelled.bind(this));
        this.shopifyEvents.on(`webhook:orders/create`, this.onOrderCreate.bind(this));
        this.shopifyEvents.on(`webhook:orders/fulfilled`, this.onOrderFulfilled.bind(this));      
        this.shopifyEvents.on(`webhook:orders/paid`, this.onOrderPaid.bind(this));      
        this.shopifyEvents.on(`webhook:orders/partially_fulfilled`, this.onOrderPartiallyFulfilled.bind(this));      
        this.shopifyEvents.on(`webhook:orders/updated`, this.onOrderUpdated.bind(this));      
        this.shopifyEvents.on(`webhook:orders/delete`, this.onOrderDelete.bind(this));      
        this.shopifyEvents.on(`webhook:order_transactions/create`, this.onOrderCreate.bind(this));

        // fulfillments
        this.shopifyEvents.on(`webhook:fulfillments/create`, this.onFulfillmentsCreate.bind(this));
        this.shopifyEvents.on(`webhook:fulfillments/update`, this.onFulfillmentsUpdate.bind(this));
    }

    // async onDraftOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
    //     this.logger.debug('onDraftOrderCreate: %s - %O', myshopifyDomain, data);
    // }
    // async onDraftOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderDelete) {
    //     this.logger.debug('onDraftOrderDelete: %s - %O', myshopifyDomain, data);
    // }
    // async onDraftOrderUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
    //     this.logger.debug('onDraftOrderUpdate: %s - %O', myshopifyDomain, data);
    // }

    protected async onOrderCancelled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCancelled) {
        // this.logger.debug('onOrderCancelled: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrderCancelled result: %O', result);
        } catch (error) {
            this.logger.error('onOrderCancelled error', error);
        }
    }
    protected async onOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        // this.logger.debug('onOrderCreate: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrderCreate result: %O', result);
        } catch (error) {
            this.logger.error('onOrderCreate error', error);
        }
    }
    protected async onOrderFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersFulfilled) {
        // this.logger.debug('onOrderFulfilled: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrderFulfilled result: %O', result);
        } catch (error) {
            this.logger.error('onOrderFulfilled error', error);
        }
    }
    protected async onOrderPaid(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPaid) {
        // this.logger.debug('onOrderPaid: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrderPaid result: %O', result);
        } catch (error) {
            this.logger.error('onOrderPaid error', error);
        }
    }
    protected async onOrderPartiallyFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled) {
        // this.logger.debug('onOrderPartiallyFulfilled: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrdonOrderPartiallyFulfillederUpdated result: %O', result);
        } catch (error) {
            this.logger.error('onOrderPartiallyFulfilled error', error);
        }
    }
    protected async onOrderUpdated(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersUpdated) {
        // this.logger.debug('onOrderUpdated: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrderUpdated result: %O', result);
        } catch (error) {
            this.logger.error('onOrderUpdated error', error);
        }
    }
    protected async onOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        // this.logger.debug('onOrderDelete: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            // this.logger.debug('onOrderDelete result: %O', result);
        } catch (error) {
            this.logger.error('onOrderDelete error', error);
        }
    }

    protected async onFulfillmentsCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentCreate) {
        // this.logger.debug('onFulfillmentsCreate: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateTracking(myshopifyDomain, data);
            // this.logger.debug('onFulfillmentsCreate result: %O', result);
        } catch (error) {
            this.logger.error('onFulfillmentsCreate error', error);
        }
    }
    protected async onFulfillmentsUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentUpdate) {
        // this.logger.debug('onFulfillmentsUpdate: %s - %O', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateTracking(myshopifyDomain, data);
            // this.logger.debug('onFulfillmentsUpdate result: %O', result);
        } catch (error) {
            this.logger.error('onFulfillmentsUpdate error', error);
        }
    }

    protected async updateOrCreateTracking(myshopifyDomain: string, shopifyFulfillment: AnyWebhookFulfillment, overwrite: Partial<ParcellabOrder> = {}) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return ['Missing settings.'];
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        let tracking = await this.transformTracking(shopifyAuth, settings, shopifyFulfillment);
        tracking = {...tracking, ...overwrite};
        const result = await api.createOrUpdateOrder(tracking, this.testMode);
        return result;
    }

    protected async updateOrCreateOrder(myshopifyDomain: string, shopifyOrder: AnyWebhookOrder, overwrite: Partial<ParcellabOrder> = {}) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        let order = await this.transformOrder(shopifyAuth, settings, shopifyOrder);

        order = {...order, ...overwrite};
        const orderResult = await api.createOrUpdateOrder(order, this.testMode);

        // If the order has fulfillments we can create tracking of them and not only a order
        const trackingResults: string[] = [];
        if (shopifyOrder.fulfillments && shopifyOrder.fulfillments.length > 0) {
            for (const shopifyFulfillment of shopifyOrder.fulfillments) {
                const tracking = await this.transformTracking(shopifyAuth, settings, shopifyFulfillment, shopifyOrder, order);
                const trackingResult = await api.createOrUpdateOrder(tracking, this.testMode);
                trackingResults.push(...trackingResult);
            }
        }

        const result = [...orderResult, ...trackingResults];

        return result;
    }

    /**
     * Transform shopify fulfillment to a parcel lab compatible tracking object
     * @param shopifyAuth 
     * @param shopifyFulfillment 
     * @param order Currently only used in updateOrCreateOrder because we already have the order object there and do not need to fetch in again
     */
    protected async transformTracking(shopifyAuth: IShopifyConnect, parcelLabSettings: ParcelLabSettings, shopifyFulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment, shopifyOrder?: Partial<Interfaces.Order>, order?: ParcellabOrder ): Promise<ParcellabOrder> {

        if (!shopifyOrder) {
            shopifyOrder = await this.getShopifyOrder(shopifyAuth, shopifyFulfillment);
        }
        
        if (!order && shopifyOrder) {
            order = await this.getOrderData(shopifyAuth, parcelLabSettings, shopifyFulfillment, shopifyOrder) || undefined;
        }

        /**
         * TODO transform missing properties:
         * * announced_delivery_date
         * * cashOnDelivery
         * * courierServiceLevel
         * * return
         * * send_date
         * * upgrade
         * * announced_delivery_date
         */
        const tracking: Partial<ParcellabOrder> = {
            ...(order || {}),
            articles: await this.transformLineItems(shopifyAuth, shopifyOrder, shopifyFulfillment.line_items),
            branchDelivery: false, // TODO set this true of this is a store / branch delivery (Filiallieferung)
            courier: await this.getCourier(parcelLabSettings, shopifyFulfillment, order),
            client: await this.getClient(shopifyAuth) || order?.client,
            cancelled: this.getCancelled(shopifyOrder, shopifyFulfillment, order),
            complete: shopifyFulfillment.shipment_status === 'delivered' || order?.complete,            
            statuslink: order?.statuslink || shopifyFulfillment.tracking_urls ? shopifyFulfillment.tracking_urls.join(',') : shopifyFulfillment.tracking_url,
            tracking_number: shopifyFulfillment.tracking_numbers ? shopifyFulfillment.tracking_numbers.join(',') : shopifyFulfillment.tracking_number,
            warehouse: shopifyFulfillment.location_id ? shopifyFulfillment.location_id?.toString() : undefined,
            customFields: {
                ...order?.customFields || {},
                notify_customer: order?.customFields?.notify_customer || shopifyFulfillment.notify_customer,
                status: order?.customFields?.status || shopifyFulfillment.status,
                shipment_status: order?.customFields?.shipment_status || shopifyFulfillment.shipment_status,
                verified_email: order?.customFields?.verified_email || shopifyOrder?.customer?.verified_email,
                accepts_marketing: order?.customFields?.accepts_marketing || shopifyOrder?.customer?.accepts_marketing,
                fulfillment_status: order?.customFields?.fulfillment_status || shopifyOrder.fulfillment_status,
                financial_status: order?.customFields?.financial_status || shopifyOrder.financial_status,
                checkout_token: order?.customFields?.checkout_token || shopifyOrder.checkout_token,
                cancelled_at: order?.customFields?.cancelled_at || shopifyOrder.cancelled_at
            },
        }

        if ((shopifyFulfillment as AnyWebhookFulfillment).destination) {
            shopifyFulfillment = shopifyFulfillment as AnyWebhookFulfillment;
            tracking.city = shopifyFulfillment.destination.city || order?.city;
            tracking.destination_country_iso3 = shopifyFulfillment.destination.country_code || order?.destination_country_iso3;
            tracking.phone = shopifyFulfillment.destination.phone;
            tracking.recipient = shopifyFulfillment.destination.name || order?.recipient_notification;
            tracking.recipient_notification = shopifyFulfillment.destination.name || order?.recipient_notification;
            tracking.street = shopifyFulfillment.destination.address1;
            tracking.zip_code = shopifyFulfillment.destination.zip;

            tracking.email = shopifyFulfillment?.email || order?.email;
        }

        if (tracking.tracking_number && typeof tracking.tracking_number === 'string') {
            const { courier, trackingNumber } = await this.validateCourier(parcelLabSettings, tracking.tracking_number, tracking.courier);
            tracking.tracking_number = trackingNumber || tracking.tracking_number;
            tracking.courier = courier || tracking.courier
        }

        // Delete courier property if we do not have a tracking number
        if (!tracking.tracking_number || tracking.tracking_number.length === 0) {
            delete tracking.courier;
        }

        if (tracking.cancelled) {
            console.warn(`tracking cancelled "${tracking.cancelled}" at "${tracking.customFields.cancelled_at}" for order number "${tracking.orderNo}".`);
        }

        return tracking as ParcellabOrder;
    }

    protected async transformOrder(shopifyAuth: IShopifyConnect, parcelLabSettings: ParcelLabSettings, shopifyOrder: Partial<Interfaces.Order>): Promise<ParcellabOrder> {

        // let shopifyCheckout: Partial<Interfaces.Checkout> | undefined | null;
        // if (shopifyOrder.checkout_token) {
        //     shopifyCheckout = await this.getCheckout(shopifyAuth, shopifyOrder.checkout_token);
        // }

        /**
         * TODO transform missing properties:
         * * announced_delivery_date
         * * cashOnDelivery
         * * courierServiceLevel
         * * return
         * * send_date
         * * upgrade
         * * announced_delivery_date
         * 
         * The following are set on tracking, so not necessary here
         * * branchDelivery
         * * tracking_number
         */
        const order: ParcellabOrder = {
            articles: await this.transformLineItems(shopifyAuth, shopifyOrder, shopifyOrder?.line_items),
            // We do not track the courier until we have a tracking number
            // courier: await this.getCourier(parcelLabSettings, null, null, shopifyOrder, shopifyCheckout),
            city: shopifyOrder?.shipping_address?.city,
            client: await this.getClient(shopifyAuth),
            orderNo: shopifyOrder?.order_number?.toString(),
            cancelled: this.getCancelled(shopifyOrder),
            complete: shopifyOrder?.fulfillment_status === 'fulfilled',
            customerNo: shopifyOrder?.customer?.id?.toString(),
            deliveryNo: shopifyOrder?.id?.toString(), // TODO CHECKME
            destination_country_iso3: shopifyOrder?.shipping_address?.country_code,
            email: shopifyOrder?.customer?.email,
            language_iso3: await this.getLocaleCode(shopifyAuth, shopifyOrder),
            market: shopifyOrder?.source_name,
            order_date: new Date(shopifyOrder?.created_at),
            phone: shopifyOrder?.customer?.phone,
            recipient: this.getName(shopifyOrder),
            recipient_notification: this.getName(shopifyOrder),
            statuslink: shopifyOrder?.order_status_url,
            street: shopifyOrder?.shipping_address?.address1,
            warehouse: shopifyOrder?.location_id ? shopifyOrder?.location_id?.toString() : undefined,
            weight: shopifyOrder?.total_weight?.toString(),
            xid: shopifyOrder?.id?.toString(),
            zip_code: shopifyOrder?.shipping_address?.zip,
            customFields: {
                verified_email: shopifyOrder?.customer?.verified_email,
                accepts_marketing: shopifyOrder?.customer?.accepts_marketing,
                fulfillment_status: shopifyOrder?.fulfillment_status,
                financial_status: shopifyOrder?.financial_status,
                checkout_token: shopifyOrder?.checkout_token,
                cancelled_at: shopifyOrder?.cancelled_at
            },
        };

        if (order.cancelled) {
            console.warn(`order cancelled "${order.cancelled}" at "${order.customFields.cancelled_at}" for order number "${order.orderNo}".`);
        }

        return order;
    }

    protected async transformLineItems(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>, lineItems: Interfaces.DraftOrder['line_items'] | Interfaces.Order['line_items'] = []): Promise<ParcellabArticle[]> {
        const articles: ParcellabArticle[] = [];
        for (const lineItem of lineItems) {
            const article: ParcellabArticle = {
                articleName: lineItem.title + ' ' + lineItem.variant_title,
                articleNo: await this.getArticleNo(lineItem),
                quantity: lineItem.quantity,
            };
            const { articleNo, articleCategory, articleImageUrl, articleUrl } = await this.getProductData(shopifyAuth, shopifyOrder, lineItem);
            
            article.articleNo = articleNo || article.articleNo;
            article.articleCategory = articleCategory;
            article.articleImageUrl = articleImageUrl;
            article.articleUrl = articleUrl;
            articles.push(article);
        }
        return articles;
    }

    protected getCancelled(shopifyOrder?: Partial<Interfaces.Order>, shopifyFulfillment?: AnyWebhookFulfillment | Interfaces.Fulfillment, order?: ParcellabOrder ) {
        if (order?.cancelled === true) {
            return true;
        }
        if (shopifyFulfillment?.status === 'cancelled') {
            return true;
        }
        if (shopifyOrder?.cancelled_at && typeof (shopifyOrder?.cancelled_at) === 'string') {
            return true;
        }
        return false;
    }

    protected async getArticleUrl(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>, product: Partial<Interfaces.Product>, prepend = 'https://'): Promise<string> {
        const domain = await this.getShopDomain(shopifyAuth, shopifyOrder);
        let url = domain + '/products/' + product.handle;
        if (!url.startsWith('http')) {
            url = prepend + url;
        }
        return url;
    }

    protected async getShopDomain(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>): Promise<string> {
        return this.getShopDomainFromNoteAttributes(shopifyOrder) || shopifyAuth.shop.domain;
    }

    /**
     * Special case (for a private client) if the real domain was passed via additional note attributes 
     * @param shopifyOrder 
     */
    protected getShopDomainFromNoteAttributes(shopifyOrder: Partial<Interfaces.Order>) {
        if (!shopifyOrder?.note_attributes) {
            return null;
        }
        for (const noteAttribute of shopifyOrder.note_attributes) {
            if(noteAttribute.name === 'domain') {
                return noteAttribute.value?.toString();
            }
        }
        return null;
    }

    protected async getArticleNo(lineItem: Interfaces.DraftLineItem | Interfaces.LineItem | Interfaces.ProductVariant): Promise<string> {
        if (PREFER_SKU && lineItem.sku) {
            return lineItem.sku;
        }
        if ((lineItem as Interfaces.ProductVariant).barcode) {
            return (lineItem as Interfaces.ProductVariant).barcode;
        }
        if ((lineItem as Interfaces.LineItem).variant_id) {
            return (lineItem as Interfaces.LineItem).variant_id.toString();
        }
        if (lineItem.product_id) {
            return lineItem.product_id.toString();
        }
        return lineItem.id.toString();
    }

    protected async getClient(shopifyAuth: IShopifyConnect) {
        return shopifyAuth.shop.name;
    }

    protected async getLocaleCode(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>) {
        const langCode = this.getLocalCodeFromNoteAttributes(shopifyOrder) || shopifyOrder?.customer_locale || shopifyOrder?.billing_address?.country_code || shopifyOrder?.shipping_address?.country_code || shopifyOrder?.customer?.default_address?.country_code || shopifyAuth?.shop?.primary_locale;
        return langCode;
    }

    /**
     * Special case (for a private client) if the locale code was passed via additional note attributes 
     * @param shopifyOrder 
     */
    protected getLocalCodeFromNoteAttributes(shopifyOrder: Partial<Interfaces.Order>) {
        if (!shopifyOrder?.note_attributes) {
            return null;
        }
        for (const noteAttribute of shopifyOrder.note_attributes) {
            if(noteAttribute.name === 'locale') {
                return noteAttribute.value?.toString();
            }
        }
        return null;
    }

    protected getName(shopifyOrder: Partial<Interfaces.Order>): string | undefined {
        if (shopifyOrder?.customer?.name) {
            return shopifyOrder?.customer?.name
        }
        
        if (shopifyOrder?.customer?.first_name || shopifyOrder?.customer?.last_name) {
            if (shopifyOrder.customer?.first_name && shopifyOrder.customer?.last_name) {
                return shopifyOrder.customer?.first_name + ' ' + shopifyOrder.customer?.last_name;
            } else if (shopifyOrder.customer?.first_name) {
                return shopifyOrder.customer?.first_name;
            } else if (shopifyOrder.customer?.last_name) {
                return shopifyOrder.customer?.last_name;
            }
        }
        return undefined;
    }

    protected async getShopifyAuth(domain: string) {
        return this.shopify.findByDomain(domain)
    }

    protected async getProductData(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>, lineItem: Interfaces.LineItem): Promise<{articleNo?: string; articleCategory?: string; articleImageUrl?: string; articleUrl?: string}> {
        try {
            const product = await this.product.getFromShopify(shopifyAuth, lineItem.product_id);
            const variant = await this.getVariant(product, lineItem.variant_id);
            return {
                articleNo: await this.getArticleNo(variant || lineItem), // TODO make configurable what the articleNo should be
                articleCategory: undefined, // TODO how can we get the collections of a product?
                articleImageUrl: this.getProductImageSource(product, lineItem.variant_id),
                articleUrl: await this.getArticleUrl(shopifyAuth, shopifyOrder, product),
            }
        } catch (error) {
            this.logger.error('getProductData', error);
            return {
                articleNo: await this.getArticleNo(lineItem),
                articleCategory: undefined,
                articleImageUrl: undefined,
                articleUrl: undefined,
            };
        }
    }

    protected async getShopifyOrder(shopifyAuth: IShopifyConnect, fulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment): Promise<Partial<Interfaces.Order> | null> {
        if (!fulfillment.order_id) {
            this.logger.warn('getOrderData no order_id given!');
            return null;
        }
        try {
            const shopifyOrder = await this.order.getFromShopify(shopifyAuth, fulfillment.order_id, { status: 'any' } as any); // By default archived orders are not found by the api
            return shopifyOrder;
        } catch (error) {
            this.logger.error(`Error on getOrderData with order_id ${ fulfillment.order_id } for shop ${shopifyAuth.myshopify_domain}`, error);
            return null;
        }
    }

    protected async getOrderData(shopifyAuth: IShopifyConnect, parcelLabSettings: ParcelLabSettings, fulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment, shopifyOrder: Partial<Interfaces.Order>): Promise<ParcellabOrder | null> {
        if (!fulfillment.order_id) {
            this.logger.warn('getOrderData no order_id given!');
            return null;
        }
        try {
            
            return this.transformOrder(shopifyAuth, parcelLabSettings, shopifyOrder);
        } catch (error) {
            this.logger.error(`Error on getOrderData with order_id ${ fulfillment.order_id } for shop ${shopifyAuth.myshopify_domain}`, error);
            return null;
        }
    }

    protected async getCheckout(shopifyAuth: IShopifyConnect, checkoutToken: string) {
        try {
            const checkout = this.checkout.getFromShopify(shopifyAuth, checkoutToken, {});
            return checkout;
        } catch (error) {
            this.logger.error(error);
            return null;
        }
        
    }

    protected async getVariant(product: Partial<Interfaces.Product>, variant_id: number): Promise<Interfaces.ProductVariant | null> {
        for (const variant of product.variants) {
            if (variant.id === variant_id) {
                return variant;
            }
        }
        return null;
    }

    protected getProductImageSource(product: Partial<Interfaces.Product>, variant_id: number) {
        for (const image of product.images) {
            for (const imageVarId of image.variant_ids) {
                if (variant_id === imageVarId) {
                    return image.src;
                }
            }
        }
        // Get default image if no variant image was found
        return product.image?.src;
    }

    /**
     * "DHL Express" -> "dhl-express"
     * @param courier 
     */
    protected handleCourierName(courier?: string) {
        if (typeof courier === 'string') {
            courier = courier.trim().toLowerCase().replace(/\s/g,"-");
        }
        if (courier === 'other' || courier === 'any' || courier === 'std') {
            courier = undefined;
        }
        return courier;
    }

    protected async validateCourier(parcelLabSettings: ParcelLabSettings, trackingNumber?: string, courier?: string) {
        if (!trackingNumber || typeof trackingNumber !== 'string') {
            return { courier, trackingNumber }
        }

        let detectedCourier: string;

        // Use TrackingMore API to get the carrier 
        if (parcelLabSettings.fallback_detect_carrier_by_tracking_more && parcelLabSettings.tracking_more_token) {
            // Only use tracking more if we have no courier to keep the number of requests small
            if (!courier) {
                try {
                    const trackingMore = new TrackingMoreService(parcelLabSettings.tracking_more_token);
                    const detectResult = await trackingMore.detectCarrier(trackingNumber);
                    if (detectResult.meta.code === 200 && detectResult.data?.length > 0 && detectResult.data[0].code) {
                        detectedCourier = detectResult.data[0].code;
                    }
                    this.logger.debug(`[validateCourier] Detected courier from tracking more: "${detectedCourier}"`, detectResult);
                } catch (error) {
                    this.logger.error(error);
                }
            }
        }

        return { courier: (detectedCourier || courier), trackingNumber }
    }

    protected async getCourier(parcelLabSettings: ParcelLabSettings, shopifyFulfillment?: AnyWebhookFulfillment | Interfaces.Fulfillment | null, order?: ParcellabOrder | null, shopifyOrder?: Partial<Interfaces.Order>, shopifyCheckout?: Partial<Interfaces.Checkout>) {
        let courier = shopifyFulfillment?.tracking_company || order?.courier;
        courier = this.handleCourierName(courier);
        // If this option is true we prefer the courier from the shipping method title the customer has selected in the checkout process otherwise this is just the fallback
        if (parcelLabSettings.prefer_checkout_shipping_method || !courier) {
            courier = this.transformCheckoutShippingToCourier(shopifyCheckout?.shipping_line?.title || shopifyCheckout?.shipping_rate?.title, courier);
        }
        
        return courier;
    }

    protected transformCheckoutShippingToCourier(shippingMethodTitle: string, fallbackName?: string) {
        let courier: string | undefined;
        if (!shippingMethodTitle) {
            courier = fallbackName;
            return courier;
        }
        courier = this.handleCourierName(shippingMethodTitle);

        const search = [
            {
                includes: ['dhl', 'express'],
                corresponds: 'dhl-express'
            },
            {
                includes: ['dhl', 'germany'],
                corresponds: 'dhl-germany'
            },
            {
                includes: ['dhl', 'de'],
                corresponds: 'dhl-germany'
            },
            {
                includes: ['dhl'],
                corresponds: 'dhl'
            },
            {
                includes: ['dpd', 'express'],
                corresponds: 'dpd-express'
            },
            {
                includes: ['dpd'],
                corresponds: 'dpd'
            },
            {
                includes: ['hermes'],
                corresponds: 'hermes'
            },
            {
                includes: ['wn', 'direct'],
                corresponds: 'wn-direct'
            },
            {
                includes: ['colis', 'priv'], // Colis Privé
                corresponds: 'colisprivee'
            },
            {
                includes: ['asendia'],
                corresponds: 'asendia'
            },
            {
                includes: ['gls'],
                corresponds: 'gls'
            },
            {
                includes: ['ontrac'],
                corresponds: 'ontrac'
            },
            {
                includes: ['fedex'],
                corresponds: 'fedex'
            },
            {
                includes: ['tnt'],
                corresponds: 'tnt'
            },
            {
                includes: ['liefery'],
                corresponds: 'liefery'
            },
            {
                includes: ['chronopost'],
                corresponds: 'chronopost'
            },
            {
                includes: ['mondial', 'relay'],
                corresponds: 'mondial-relay'
            },
            {
                includes: ['seur'],
                corresponds: 'seur'
            },
            {
                includes: ['poczta', 'polska'],
                corresponds: 'poczta-polska'
            },
            {
                includes: ['ppl'],
                corresponds: 'ppl'
            },
            {
                includes: ['pošta'],
                corresponds: 'pošta'
            },
            {
                includes: ['post'],
                corresponds: 'post'
            },
            {
                includes: ['ups', 'express'],
                corresponds: 'ups-express'
            },
            {
                includes: ['ups'],
                corresponds: 'ups'
            },
        ];

        for (const curSearch of search) {
            const match = curSearch.includes.every(item => courier.includes(item));
            if (match) {
                courier = curSearch.corresponds;
                return courier;
            }
        }
        
        return fallbackName;
    }

}
