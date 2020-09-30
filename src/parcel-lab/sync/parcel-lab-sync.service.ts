import { Injectable } from '@nestjs/common';
import { ParcelLabApi } from '../api/parcel-lab-api';
import { ParcellabOrder, ParcellabTracking, ParcellabArticle } from '../api/interfaces';
import { SettingsService } from '../settings/settings.service';
import { EventService, Interfaces, ShopService, ProductsService, OrdersService, ShopifyConnectService, IShopifyConnect } from 'nest-shopify';

type AnyWebhookOrder = Interfaces.WebhooksReponse.WebhookOrdersFulfilled | Interfaces.WebhooksReponse.WebhookOrdersPaid | Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled | Interfaces.WebhooksReponse.WebhookOrdersUpdated | Interfaces.WebhooksReponse.WebhookOrdersCreate;

type AnyWebhookFulfillment =  Interfaces.WebhooksReponse.WebhookFulfillmentCreate | Interfaces.WebhooksReponse.WebhookFulfillmentUpdate

@Injectable()
export class ParcelLabSyncService {
    constructor(
        protected readonly shopifyEvents: EventService,
        protected readonly shopify: ShopifyConnectService,
        protected readonly parcelLabSettings: SettingsService,
        protected readonly shop: ShopService,
        protected readonly product: ProductsService,
        protected readonly order: OrdersService,
    ) {
        this.addEventListeners();
    }

    addEventListeners() {
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

    async onDraftOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
        console.debug('onDraftOrderCreate', myshopifyDomain, data);
    }
    async onDraftOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderDelete) {
        console.debug('onDraftOrderDelete', myshopifyDomain, data);
    }
    async onDraftOrderUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
        console.debug('onDraftOrderUpdate', myshopifyDomain, data);
    }

    async onOrderCancelled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCancelled) {
        console.debug('onOrderCancelled', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrderCancelled result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        console.debug('onOrderCreate', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrderCreate result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onOrderFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersFulfilled) {
        console.debug('onOrderFulfilled', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrderFulfilled result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onOrderPaid(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPaid) {
        console.debug('onOrderPaid', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrderPaid result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onOrderPartiallyFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled) {
        console.debug('onOrderPartiallyFulfilled', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrdonOrderPartiallyFulfillederUpdated result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onOrderUpdated(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersUpdated) {
        console.debug('onOrderUpdated', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrderUpdated result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        console.debug('onOrderDelete', myshopifyDomain, data);
        try {
            const result = await this.pushOrder(myshopifyDomain, data);
            console.debug('onOrderDelete result', result);
        } catch (error) {
            console.error(error);
        }
    }

    async onFulfillmentsCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentCreate) {
        console.debug('onFulfillmentsCreate', myshopifyDomain, data);
        try {
            const result = await this.pushTracking(myshopifyDomain, data);
            console.debug('onFulfillmentsCreate result', result);
        } catch (error) {
            console.error(error);
        }
    }
    async onFulfillmentsUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentUpdate) {
        console.debug('onFulfillmentsUpdate', myshopifyDomain, data);
        try {
            const result = await this.pushTracking(myshopifyDomain, data);
            console.debug('onFulfillmentsUpdate result', result);
        } catch (error) {
            console.error(error);
        }
    }

    protected async pushTracking(myshopifyDomain, data: AnyWebhookFulfillment, overwrite: Partial<ParcellabTracking> = {}) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            console.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        let tracking = await this.transformTracking(shopifyAuth, data);
        tracking = {...tracking, ...overwrite};
        const result = await api.createTracking(tracking, true);
        return result;
    }

    protected async pushOrder(myshopifyDomain, data: AnyWebhookOrder, overwrite: Partial<ParcellabOrder> = {}) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            console.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        let order = await this.transformOrder(shopifyAuth, data);
        order = {...order, ...overwrite};
        const result = await api.createOrder(order, true);
        return result;
    }

    protected async transformTracking(shopifyAuth: IShopifyConnect, shopifyFulfillment: AnyWebhookFulfillment): Promise<ParcellabTracking> {
        const order = await this.getOrderData(shopifyAuth, shopifyFulfillment);
        const tracking: ParcellabTracking = {
            ...order,
            articles: await this.transformLineItems(shopifyAuth, shopifyFulfillment.line_items),
            // announced_delivery_date:
            branchDelivery: shopifyFulfillment.tracking_numbers?.length > 1, // TODO checkm,
            // cashOnDelivery:
            city: shopifyFulfillment.destination?.city || order?.city,
            client: await this.getClient(shopifyAuth) || order.client,
            // orderNo: = shopifyOrder.order_id;
            cancelled: shopifyFulfillment.status === 'cancelled' || order.cancelled,
            complete: shopifyFulfillment.shipment_status === 'delivered' || order.complete,
            courier: await this.getCourier(shopifyFulfillment) || order.courier,
            // courierServiceLevel:
            // customerNo: = shopifyOrder.customer?.id.toString();
            // deliveryNo: = shopifyOrder.id.toString(), // TODO CHECKME;
            destination_country_iso3: shopifyFulfillment.destination.country_code || order.destination_country_iso3,
            email: shopifyFulfillment?.email || order?.email,
            // language_iso3: = await this.getLangCode(shopifyAuth, shopifyOrder);
            // market: = shopifyOrder.source_name, // CHECKME
            // order_date: = new Date(shopifyOrder.created_at);
            phone: shopifyFulfillment.destination?.phone,
            recipient: shopifyFulfillment.destination.name || order.recipient_notification,
            recipient_notification: shopifyFulfillment.destination.name || order.recipient_notification,
            // return:;
            // send_date:;
            statuslink: shopifyFulfillment.tracking_urls ? shopifyFulfillment.tracking_urls.join(',') : shopifyFulfillment.tracking_url,
            street: shopifyFulfillment.destination.address1,
            tracking_number: shopifyFulfillment.tracking_numbers ? shopifyFulfillment.tracking_numbers.join(',') : shopifyFulfillment.tracking_number,
            // upgrade:;
            warehouse: shopifyFulfillment.location_id ? shopifyFulfillment.location_id.toString() : undefined,
            // weight: = shopifyOrder.total_weight.toString();
            // order.xid = shopifyFulfillment.id.toString(), // TODO CHECKM;
            zip_code: shopifyFulfillment.destination?.zip,

            // announced_delivery_date:
            // customFields: {...order.customFields, ...shopifyFulfillment},
        }

        return tracking;
    }

    protected async transformOrder(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>): Promise<ParcellabOrder> {
        const order: ParcellabOrder = {
            articles: await this.transformLineItems(shopifyAuth, shopifyOrder.line_items),
            // announced_delivery_date
            // branchDelivery
            // cashOnDelivery
            city: shopifyOrder?.shipping_address?.city,
            client: await this.getClient(shopifyAuth),
            orderNo: shopifyOrder.order_number.toString(),
            cancelled: shopifyOrder.cancelled_at !== null ? true : false,
            complete: shopifyOrder.fulfillment_status === 'fulfilled',
            // courier
            // courierServiceLevel
            customerNo: shopifyOrder.customer?.id.toString(),
            deliveryNo: shopifyOrder.id.toString(), // TODO CHECKME
            destination_country_iso3: shopifyOrder.shipping_address?.country_code,
            email: shopifyOrder.customer?.email,
            language_iso3: await this.getLangCode(shopifyAuth, shopifyOrder),
            market: shopifyOrder.source_name,
            order_date: new Date(shopifyOrder.created_at),
            phone: shopifyOrder.customer?.phone,
            recipient: this.getName(shopifyOrder),
            recipient_notification: this.getName(shopifyOrder),
            // return:
            // send_date 
            statuslink: shopifyOrder.order_status_url,
            street: shopifyOrder.shipping_address?.address1,
            // tracking_number: 
            // upgrade
            warehouse: shopifyOrder.location_id ? shopifyOrder.location_id.toString() : undefined,
            weight: shopifyOrder.total_weight.toString(),
            xid: shopifyOrder.id.toString(), // TODO CHECKME
            zip_code: shopifyOrder.shipping_address?.zip,
            // customFields: shopifyOrder,
        };

        // order.announced_delivery_date

        return order;
    }

    protected async transformLineItems(shopifyAuth: IShopifyConnect, lineItems: Interfaces.DraftOrder['line_items'] | Interfaces.Order['line_items'] ): Promise<ParcellabArticle[]> {
        const articles: ParcellabArticle[] = [];
        for (const lineItem of lineItems) {
            const article: ParcellabArticle = {
                articleName: lineItem.variant_title,
                articleNo: lineItem.variant_id.toString(),
                quantity: lineItem.quantity,
            };
            const { articleCategory, articleImageUrl, articleUrl } = await this.getProductData(shopifyAuth, lineItem);

            article.articleCategory = articleCategory;
            article.articleImageUrl = articleImageUrl;
            article.articleUrl = articleUrl;
            articles.push(article);
        }
        return articles;
    }

    protected async getClient(shopifyAuth: IShopifyConnect) {
        return shopifyAuth.shop.name;
    }

    protected async getLangCode(shopifyAuth: IShopifyConnect, shopifyOrder: Partial<Interfaces.Order>) {
        const langCode = shopifyOrder.customer_locale || shopifyOrder.billing_address?.country_code || shopifyOrder.shipping_address?.country_code || shopifyOrder.customer?.default_address?.country_code || shopifyAuth.shop.primary_locale;
        return langCode;
    }

    protected getName(shopifyOrder: Partial<Interfaces.Order>) {
        return shopifyOrder.customer?.name || (shopifyOrder.customer?.first_name + ' ' + shopifyOrder.customer?.last_name);
    }

    protected async getShopifyAuth(domain: string) {
        return this.shopify.findByDomain(domain)
    }

    protected async getProductData(shopifyAuth: IShopifyConnect, lineItem: Interfaces.LineItem): Promise<{articleCategory?: string; articleImageUrl?: string; articleUrl?: string}> {
        try {
            const product = await this.product.getFromShopify(shopifyAuth, lineItem.product_id);
            return {
                articleCategory: undefined, // TODO how can we get the collections of a product?
                articleImageUrl: this.getProductImageSource(product, lineItem.variant_id),
                articleUrl: shopifyAuth.shop.domain + '/products/' + product.handle,
            }
        } catch (error) {
            console.error('getProductData', error);
            return {
                articleCategory: undefined,
                articleImageUrl: undefined,
                articleUrl: undefined,
            };
        }

    }

    protected async getOrderData(shopifyAuth: IShopifyConnect, fulfillment: AnyWebhookFulfillment): Promise<Partial<ParcellabOrder>> {
        if (!fulfillment.order_id) {
            console.warn('getOrderData no order_id given!');
            return {};
        }
        try {
            const order = await this.order.getFromShopify(shopifyAuth, fulfillment.order_id, { status: 'any' } as any); // By default archived orders are not found by the api
            return this.transformOrder(shopifyAuth, order);
        } catch (error) {
            console.error(`Error on getOrderData with order_id ${ fulfillment.order_id } for shop ${shopifyAuth.myshopify_domain}`, error);
            return {};
        }

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

    protected async getCourier(fulfillment: AnyWebhookFulfillment) {
        return fulfillment.tracking_company;
    }

}
