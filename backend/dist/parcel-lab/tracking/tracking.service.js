"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelLabTrackingService = void 0;
const common_1 = require("@nestjs/common");
const parcel_lab_api_1 = require("../api/parcel-lab-api");
const settings_service_1 = require("../settings/settings.service");
const nest_shopify_1 = require("nest-shopify");
const settings_1 = require("../interfaces/settings");
let ParcelLabTrackingService = class ParcelLabTrackingService {
    constructor(shopifyModuleOptions, shopifyEvents, shopify, parcelLabSettings, shop, product, order, transaction) {
        this.shopifyModuleOptions = shopifyModuleOptions;
        this.shopifyEvents = shopifyEvents;
        this.shopify = shopify;
        this.parcelLabSettings = parcelLabSettings;
        this.shop = shop;
        this.product = product;
        this.order = order;
        this.transaction = transaction;
        this.logger = new nest_shopify_1.DebugService('parcelLab:ParcelLabTrackingService');
        this.testMode = false;
        this.testMode = !!this.shopifyModuleOptions.app.debug;
        this.addEventListeners();
    }
    async list(myshopifyDomain, search, page, size) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const api = new parcel_lab_api_1.ParcelLabApi(settings.user, settings.token);
        return api.search(search, page, size);
    }
    addEventListeners() {
        this.shopifyEvents.on(`webhook:orders/cancelled`, this.onOrderCancelled.bind(this));
        this.shopifyEvents.on(`webhook:orders/create`, this.onOrderCreate.bind(this));
        this.shopifyEvents.on(`webhook:orders/fulfilled`, this.onOrderFulfilled.bind(this));
        this.shopifyEvents.on(`webhook:orders/paid`, this.onOrderPaid.bind(this));
        this.shopifyEvents.on(`webhook:orders/partially_fulfilled`, this.onOrderPartiallyFulfilled.bind(this));
        this.shopifyEvents.on(`webhook:orders/updated`, this.onOrderUpdated.bind(this));
        this.shopifyEvents.on(`webhook:orders/delete`, this.onOrderDelete.bind(this));
        this.shopifyEvents.on(`webhook:order_transactions/create`, this.onOrderCreate.bind(this));
        this.shopifyEvents.on(`webhook:fulfillments/create`, this.onFulfillmentsCreate.bind(this));
        this.shopifyEvents.on(`webhook:fulfillments/update`, this.onFulfillmentsUpdate.bind(this));
    }
    async onOrderCancelled(myshopifyDomain, data) {
        this.logger.debug('onOrderCancelled', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrderCancelled result', result);
        }
        catch (error) {
            console.error('onOrderCancelled error', error);
        }
    }
    async onOrderCreate(myshopifyDomain, data) {
        this.logger.debug('onOrderCreate', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrderCreate result', result);
        }
        catch (error) {
            console.error('onOrderCreate error', error);
        }
    }
    async onOrderFulfilled(myshopifyDomain, data) {
        this.logger.debug('onOrderFulfilled', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrderFulfilled result', result);
        }
        catch (error) {
            console.error('onOrderFulfilled error', error);
        }
    }
    async onOrderPaid(myshopifyDomain, data) {
        this.logger.debug('onOrderPaid', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrderPaid result', result);
        }
        catch (error) {
            console.error('onOrderPaid error', error);
        }
    }
    async onOrderPartiallyFulfilled(myshopifyDomain, data) {
        this.logger.debug('onOrderPartiallyFulfilled', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrdonOrderPartiallyFulfillederUpdated result', result);
        }
        catch (error) {
            console.error('onOrderPartiallyFulfilled error', error);
        }
    }
    async onOrderUpdated(myshopifyDomain, data) {
        this.logger.debug('onOrderUpdated', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrderUpdated result', result);
        }
        catch (error) {
            console.error('onOrderUpdated error', error);
        }
    }
    async onOrderDelete(myshopifyDomain, data) {
        this.logger.debug('onOrderDelete', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
            this.logger.debug('onOrderDelete result', result);
        }
        catch (error) {
            console.error('onOrderDelete error', error);
        }
    }
    async onFulfillmentsCreate(myshopifyDomain, data) {
        this.logger.debug('onFulfillmentsCreate', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateTracking(myshopifyDomain, data);
            this.logger.debug('onFulfillmentsCreate result', result);
        }
        catch (error) {
            console.error('onFulfillmentsCreate error', error);
        }
    }
    async onFulfillmentsUpdate(myshopifyDomain, data) {
        this.logger.debug('onFulfillmentsUpdate', myshopifyDomain, data);
        try {
            const result = await this.updateOrCreateTracking(myshopifyDomain, data);
            this.logger.debug('onFulfillmentsUpdate result', result);
        }
        catch (error) {
            console.error('onFulfillmentsUpdate error', error);
        }
    }
    async updateOrCreateTracking(myshopifyDomain, shopifyFulfillment, overwrite = {}) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return ['Missing settings.'];
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new parcel_lab_api_1.ParcelLabApi(settings.user, settings.token);
        let tracking = await this.transformTracking(settings, shopifyAuth, shopifyFulfillment);
        tracking = Object.assign(Object.assign({}, tracking), overwrite);
        const result = await api.createOrUpdateTracking(tracking, this.testMode);
        return result;
    }
    async updateOrCreateOrder(myshopifyDomain, shopifyOrder, overwrite = {}) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new parcel_lab_api_1.ParcelLabApi(settings.user, settings.token);
        let order = await this.transformOrder(settings, shopifyAuth, shopifyOrder);
        order = Object.assign(Object.assign({}, order), overwrite);
        const orderResult = await api.createOrUpdateOrder(order, this.testMode);
        const trackingResults = [];
        if (shopifyOrder.fulfillments && shopifyOrder.fulfillments.length > 0) {
            for (const shopifyFulfillment of shopifyOrder.fulfillments) {
                const tracking = await this.transformTracking(settings, shopifyAuth, shopifyFulfillment, order);
                const trackingResult = await api.createOrUpdateTracking(tracking, this.testMode);
                trackingResults.push(...trackingResult);
            }
        }
        return [...orderResult, ...trackingResults];
    }
    async transformTracking(settings, shopifyAuth, shopifyFulfillment, order) {
        var _a;
        if (!order) {
            order =
                (await this.getOrderData(settings, shopifyAuth, shopifyFulfillment)) ||
                    undefined;
        }
        const tracking = Object.assign(Object.assign({}, (order || {})), { articles: await this.transformLineItems(shopifyAuth, shopifyFulfillment.line_items), branchDelivery: ((_a = shopifyFulfillment.tracking_numbers) === null || _a === void 0 ? void 0 : _a.length) > 1, courier: (await this.getCourier(shopifyFulfillment)) || order.courier, client: (await this.getClient(shopifyAuth)) || order.client, cancelled: shopifyFulfillment.status === 'cancelled' || order.cancelled, complete: shopifyFulfillment.shipment_status === 'delivered' || order.complete, statuslink: shopifyFulfillment.tracking_urls
                ? shopifyFulfillment.tracking_urls.join(',')
                : shopifyFulfillment.tracking_url, tracking_number: shopifyFulfillment.tracking_numbers
                ? shopifyFulfillment.tracking_numbers.join(',')
                : shopifyFulfillment.tracking_number, warehouse: shopifyFulfillment.location_id
                ? shopifyFulfillment.location_id.toString()
                : undefined, customFields: Object.assign(Object.assign({}, (order.customFields || {})), { notify_customer: shopifyFulfillment.notify_customer }) });
        if (settings.customFields) {
            tracking.customFields = Object.assign(Object.assign({}, tracking.customFields), settings.customFields);
        }
        if (shopifyFulfillment.destination) {
            shopifyFulfillment = shopifyFulfillment;
            tracking.city = shopifyFulfillment.destination.city || (order === null || order === void 0 ? void 0 : order.city);
            tracking.destination_country_iso3 =
                shopifyFulfillment.destination.country_code ||
                    order.destination_country_iso3;
            tracking.phone = shopifyFulfillment.destination.phone;
            tracking.recipient =
                shopifyFulfillment.destination.name || order.recipient_notification;
            tracking.recipient_notification =
                shopifyFulfillment.destination.name || order.recipient_notification;
            tracking.street = shopifyFulfillment.destination.address1;
            tracking.zip_code = shopifyFulfillment.destination.zip;
            tracking.email = (shopifyFulfillment === null || shopifyFulfillment === void 0 ? void 0 : shopifyFulfillment.email) || (order === null || order === void 0 ? void 0 : order.email);
        }
        return tracking;
    }
    async transformOrder(settings, shopifyAuth, shopifyOrder) {
        var _a, _b, _c, _d, _e, _f, _g;
        const order = {
            articles: await this.transformLineItems(shopifyAuth, shopifyOrder.line_items),
            city: (_a = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.shipping_address) === null || _a === void 0 ? void 0 : _a.city,
            client: await this.getClient(shopifyAuth),
            orderNo: shopifyOrder.order_number.toString(),
            cancelled: shopifyOrder.cancelled_at !== null ? true : false,
            complete: shopifyOrder.fulfillment_status === 'fulfilled',
            customerNo: (_b = shopifyOrder.customer) === null || _b === void 0 ? void 0 : _b.id.toString(),
            deliveryNo: shopifyOrder.id.toString(),
            destination_country_iso3: (_c = shopifyOrder.shipping_address) === null || _c === void 0 ? void 0 : _c.country_code,
            email: (_d = shopifyOrder.customer) === null || _d === void 0 ? void 0 : _d.email,
            language_iso3: await this.getLangCode(shopifyAuth, shopifyOrder),
            market: shopifyOrder.source_name,
            order_date: new Date(shopifyOrder.created_at),
            phone: (_e = shopifyOrder.customer) === null || _e === void 0 ? void 0 : _e.phone,
            recipient: this.getName(shopifyOrder),
            recipient_notification: this.getName(shopifyOrder),
            statuslink: shopifyOrder.order_status_url,
            street: (_f = shopifyOrder.shipping_address) === null || _f === void 0 ? void 0 : _f.address1,
            warehouse: shopifyOrder.location_id
                ? shopifyOrder.location_id.toString()
                : undefined,
            weight: shopifyOrder.total_weight.toString(),
            xid: shopifyOrder.id.toString(),
            zip_code: (_g = shopifyOrder.shipping_address) === null || _g === void 0 ? void 0 : _g.zip,
            customFields: {
                customer: {
                    verified_email: shopifyOrder.customer.verified_email,
                    accepts_marketing: shopifyOrder.customer.accepts_marketing,
                },
                billing_address: shopifyOrder.billing_address || shopifyOrder.shipping_address,
            },
        };
        if (settings.customFields) {
            order.customFields = Object.assign(Object.assign({}, order.customFields), settings.customFields);
        }
        return order;
    }
    async transformLineItems(shopifyAuth, lineItems) {
        const articles = [];
        for (const lineItem of lineItems) {
            const article = {
                articleName: lineItem.title + ' ' + lineItem.variant_title,
                articleNo: lineItem.variant_id.toString(),
                quantity: lineItem.quantity,
            };
            const { articleNo, articleCategory, articleImageUrl, articleUrl, } = await this.getProductData(shopifyAuth, lineItem);
            article.articleNo = articleNo || article.articleNo;
            article.articleCategory = articleCategory;
            article.articleImageUrl = articleImageUrl;
            article.articleUrl = articleUrl;
            articles.push(article);
        }
        return articles;
    }
    async getClient(shopifyAuth) {
        return shopifyAuth.shop.name;
    }
    async getLangCode(shopifyAuth, shopifyOrder) {
        var _a, _b, _c, _d;
        let langCode = '';
        if (Array.isArray(shopifyOrder.note_attributes)) {
            for (const noteAttributes of shopifyOrder.note_attributes) {
                if (noteAttributes.name === 'locale' &&
                    typeof noteAttributes.value === 'string' &&
                    noteAttributes.value.length >= 2) {
                    langCode = noteAttributes.value;
                }
            }
        }
        if (!langCode || langCode.toLowerCase().startsWith('en')) {
            langCode =
                shopifyOrder.customer_locale || ((_a = shopifyOrder.billing_address) === null || _a === void 0 ? void 0 : _a.country_code) || ((_b = shopifyOrder.shipping_address) === null || _b === void 0 ? void 0 : _b.country_code) || ((_d = (_c = shopifyOrder.customer) === null || _c === void 0 ? void 0 : _c.default_address) === null || _d === void 0 ? void 0 : _d.country_code) ||
                    shopifyAuth.shop.primary_locale;
        }
        return langCode;
    }
    getName(shopifyOrder) {
        var _a, _b, _c;
        return (((_a = shopifyOrder.customer) === null || _a === void 0 ? void 0 : _a.name) ||
            ((_b = shopifyOrder.customer) === null || _b === void 0 ? void 0 : _b.first_name) + ' ' + ((_c = shopifyOrder.customer) === null || _c === void 0 ? void 0 : _c.last_name));
    }
    async getShopifyAuth(domain) {
        return this.shopify.findByDomain(domain);
    }
    async getProductData(shopifyAuth, lineItem) {
        try {
            const product = await this.product.getFromShopify(shopifyAuth, lineItem.product_id);
            const variant = await this.getVariant(product, lineItem.variant_id);
            return {
                articleNo: variant.barcode || lineItem.variant_id.toString(),
                articleCategory: undefined,
                articleImageUrl: this.getProductImageSource(product, lineItem.variant_id),
                articleUrl: shopifyAuth.shop.domain + '/products/' + product.handle,
            };
        }
        catch (error) {
            console.error('getProductData', error);
            return {
                articleNo: lineItem.variant_id.toString(),
                articleCategory: undefined,
                articleImageUrl: undefined,
                articleUrl: undefined,
            };
        }
    }
    async getOrderData(settings, shopifyAuth, fulfillment) {
        if (!fulfillment.order_id) {
            console.warn('getOrderData no order_id given!');
            return null;
        }
        try {
            const order = await this.order.getFromShopify(shopifyAuth, fulfillment.order_id, { status: 'any' });
            const transaction = await this.transaction.listFromShopify(shopifyAuth, fulfillment.order_id, {
                in_shop_currency: false,
                fields: 'amount,amount,gateway,gateway,message',
            });
            this.logger.debug('transaction', transaction);
            return this.transformOrder(settings, shopifyAuth, order);
        }
        catch (error) {
            console.error(`Error on getOrderData with order_id ${fulfillment.order_id} for shop ${shopifyAuth.myshopify_domain}`, error);
            return null;
        }
    }
    async getVariant(product, variant_id) {
        for (const variant of product.variants) {
            if (variant.id === variant_id) {
                return variant;
            }
        }
        return null;
    }
    getProductImageSource(product, variant_id) {
        var _a;
        for (const image of product.images) {
            for (const imageVarId of image.variant_ids) {
                if (variant_id === imageVarId) {
                    return image.src;
                }
            }
        }
        return (_a = product.image) === null || _a === void 0 ? void 0 : _a.src;
    }
    async getCourier(fulfillment) {
        return fulfillment.tracking_company;
    }
};
ParcelLabTrackingService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(nest_shopify_1.SHOPIFY_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, nest_shopify_1.EventService,
        nest_shopify_1.ShopifyConnectService,
        settings_service_1.SettingsService,
        nest_shopify_1.ShopService,
        nest_shopify_1.ProductsService,
        nest_shopify_1.OrdersService,
        nest_shopify_1.TransactionsService])
], ParcelLabTrackingService);
exports.ParcelLabTrackingService = ParcelLabTrackingService;
//# sourceMappingURL=tracking.service.js.map