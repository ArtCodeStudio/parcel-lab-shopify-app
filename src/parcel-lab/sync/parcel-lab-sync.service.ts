import { Injectable } from '@nestjs/common';
import { ParcelLabApi } from '../api/parcel-lab-api';
import { ParcellabOrder, ParcellabTracking, ParcellabArticle } from '../api/interfaces';
import { SettingsService } from '../settings/settings.service';
import { EventService, Interfaces, ShopService, ProductsService, OrdersService, ShopifyConnectService, IShopifyConnect } from 'nest-shopify';

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
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            console.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        const order = await this.transformOrder(shopifyAuth, data);
        const result = await api.createOrder(order, true);
        console.debug('onOrderCreate result', result);
    }
    async onOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        console.debug('onOrderCreate', myshopifyDomain, data);
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            console.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        const order = await this.transformOrder(shopifyAuth, data);
        const result = await api.createOrder(order, true);
        console.debug('onOrderCreate result', result);
    }
    async onOrderFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersFulfilled) {
        console.debug('onOrderFulfilled', myshopifyDomain, data);
    }
    async onOrderPaid(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPaid) {
        console.debug('onOrderPaid', myshopifyDomain, data);
    }
    async onOrderPartiallyFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled) {
        console.debug('onOrderPartiallyFulfilled', myshopifyDomain, data);
    }
    async onOrderUpdated(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersUpdated) {
        console.debug('onOrderUpdated', myshopifyDomain, data);
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            console.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new ParcelLabApi(settings.user, settings.token);
        const order = await this.transformOrder(shopifyAuth, data);
        const result = await api.createOrder(order, true);
        console.debug('onOrderUpdated result', result);
    }
    async onOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        console.debug('onOrderDelete', myshopifyDomain, data);
    }

    async onFulfillmentsCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentCreate) {
        console.debug('onFulfillmentsCreate', myshopifyDomain, data);
    }
    async onFulfillmentsUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentUpdate) {
        console.debug('onFulfillmentsUpdate', myshopifyDomain, data);
    }

    protected async transformOrder(shopifyAuth: IShopifyConnect, shopifyOrder: Interfaces.Order): Promise<ParcellabOrder> {
        const order: ParcellabOrder = {
            articles: await this.transformLineItems(shopifyOrder.line_items),
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
        };

        // order.announced_delivery_date

        return order;
    }

    protected async transformLineItems(lineItems: Interfaces.DraftOrder['line_items'] | Interfaces.Order['line_items'] ): Promise<ParcellabArticle[]> {
        const articles: ParcellabArticle[] = [];
        for (const lineItem of lineItems) {
            const article: ParcellabArticle = {
                articleName: lineItem.variant_title,
                articleNo: lineItem.variant_id.toString(),
                quantity: lineItem.quantity,
            };
            // article.articleCategory = lineItem.
            // article.articleImageUrl
            // article.articleUrl = lineItem.
            articles.push(article);
        }
        return articles;
    }

    protected async getClient(shopifyAuth: IShopifyConnect) {
        return shopifyAuth.shop.name;
    }

    protected async getLangCode(shopifyAuth: IShopifyConnect, shopifyOrder: Interfaces.Order) {
        const langCode = shopifyOrder.customer_locale || shopifyOrder.billing_address?.country_code || shopifyOrder.shipping_address?.country_code || shopifyOrder.customer?.default_address?.country_code || shopifyAuth.shop.primary_locale;
        return langCode;
    }

    protected getName(shopifyOrder: Interfaces.Order) {
        return shopifyOrder.customer?.name || (shopifyOrder.customer?.first_name + ' ' + shopifyOrder.customer?.last_name);
    }

    protected async getShopifyAuth(domain: string) {
        return this.shopify.findByDomain(domain)
    }

}
