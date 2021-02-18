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
const parcellab_1 = require("parcellab");
const settings_service_1 = require("../settings/settings.service");
const tracking_more_service_1 = require("../tracking-more/tracking-more.service");
const nest_shopify_1 = require("nest-shopify");
const PREFER_SKU = true;
let ParcelLabTrackingService = class ParcelLabTrackingService {
    constructor(shopifyModuleOptions, shopifyEvents, shopify, parcelLabSettings, shop, product, checkout, order) {
        this.shopifyModuleOptions = shopifyModuleOptions;
        this.shopifyEvents = shopifyEvents;
        this.shopify = shopify;
        this.parcelLabSettings = parcelLabSettings;
        this.shop = shop;
        this.product = product;
        this.checkout = checkout;
        this.order = order;
        this.logger = new nest_shopify_1.DebugService('parcelLab:ParcelLabTrackingService');
        this.testMode = false;
        this.testMode = !!this.shopifyModuleOptions.app.test;
        this.addEventListeners();
    }
    async list(myshopifyDomain, search, page, size) {
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for: %s', myshopifyDomain);
            return;
        }
        const api = new parcellab_1.ParcelLabApi(settings.user, settings.token);
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
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderCancelled error', error);
        }
    }
    async onOrderCreate(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderCreate error', error);
        }
    }
    async onOrderFulfilled(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderFulfilled error', error);
        }
    }
    async onOrderPaid(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderPaid error', error);
        }
    }
    async onOrderPartiallyFulfilled(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderPartiallyFulfilled error', error);
        }
    }
    async onOrderUpdated(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderUpdated error', error);
        }
    }
    async onOrderDelete(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateOrder(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onOrderDelete error', error);
        }
    }
    async onFulfillmentsCreate(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateTracking(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onFulfillmentsCreate error', error);
        }
    }
    async onFulfillmentsUpdate(myshopifyDomain, data) {
        try {
            const result = await this.updateOrCreateTracking(myshopifyDomain, data);
        }
        catch (error) {
            this.logger.error('onFulfillmentsUpdate error', error);
        }
    }
    async updateOrCreateTracking(myshopifyDomain, shopifyFulfillment, overwrite = {}) {
        var _a;
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return ['Missing settings.'];
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new parcellab_1.ParcelLabApi(settings.user, settings.token);
        let tracking = await this.transformTracking(shopifyAuth, settings, shopifyFulfillment);
        tracking = Object.assign(Object.assign({}, tracking), overwrite);
        let result = [];
        if (tracking.orderNo && tracking.street && tracking.city && tracking.zip_code) {
            if (!tracking.language_iso3) {
                console.warn(`[${tracking.client}] Locale code is missing for order with order name: "${(shopifyFulfillment === null || shopifyFulfillment === void 0 ? void 0 : shopifyFulfillment.name) || (shopifyFulfillment === null || shopifyFulfillment === void 0 ? void 0 : shopifyFulfillment.order_id) || ((_a = tracking === null || tracking === void 0 ? void 0 : tracking.customFields) === null || _a === void 0 ? void 0 : _a.order_id)}"`);
            }
            result = await api.createOrUpdateOrder(tracking, this.testMode);
        }
        else {
            result = ['Missing data.'];
        }
        return result;
    }
    async updateOrCreateOrder(myshopifyDomain, shopifyOrder, overwrite = {}) {
        var _a, _b;
        const settings = await this.parcelLabSettings.findByShopDomain(myshopifyDomain);
        if (!settings) {
            this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
            return;
        }
        const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
        const api = new parcellab_1.ParcelLabApi(settings.user, settings.token);
        let order = await this.transformOrder(shopifyAuth, settings, shopifyOrder);
        order = Object.assign(Object.assign({}, order), overwrite);
        let orderResult = [];
        if (order.orderNo && order.street && order.city && order.zip_code) {
            if (!order.language_iso3) {
                console.warn(`[${order.client}] Locale code is missing for order with order name: "${(shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.name) || (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.number) || (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.id) || ((_a = order === null || order === void 0 ? void 0 : order.customFields) === null || _a === void 0 ? void 0 : _a.order_id)}"`);
            }
            orderResult = await api.createOrUpdateOrder(order, this.testMode);
        }
        else {
            orderResult.push('Missing data.');
        }
        const trackingResults = [];
        if (shopifyOrder.fulfillments && shopifyOrder.fulfillments.length > 0) {
            for (const shopifyFulfillment of shopifyOrder.fulfillments) {
                const tracking = await this.transformTracking(shopifyAuth, settings, shopifyFulfillment, shopifyOrder, order);
                let trackingResult = [];
                if (tracking.orderNo && tracking.street && tracking.city && tracking.zip_code) {
                    if (!tracking.language_iso3) {
                        console.warn(`[${tracking.client}] Locale code is missing for fulfillment with order name: "${(shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.name) || (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.number) || (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.id) || ((_b = tracking === null || tracking === void 0 ? void 0 : tracking.customFields) === null || _b === void 0 ? void 0 : _b.order_id)}"`);
                    }
                    trackingResult = await api.createOrUpdateOrder(tracking, this.testMode);
                }
                else {
                    trackingResult.push('Missing data.');
                }
                trackingResults.push(...trackingResult);
            }
        }
        const result = [...orderResult, ...trackingResults];
        return result;
    }
    async transformTracking(shopifyAuth, parcelLabSettings, shopifyFulfillment, shopifyOrder, order) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (!shopifyOrder) {
            shopifyOrder = await this.getShopifyOrder(shopifyAuth, shopifyFulfillment);
        }
        if (!order && shopifyOrder) {
            order = await this.getOrderData(shopifyAuth, parcelLabSettings, shopifyFulfillment, shopifyOrder) || undefined;
        }
        const tracking = Object.assign(Object.assign({}, (order || {})), { articles: await this.transformLineItems(shopifyAuth, shopifyOrder, shopifyFulfillment.line_items), branchDelivery: false, courier: await this.getCourier(parcelLabSettings, shopifyFulfillment, order), client: await this.getClient(shopifyAuth) || (order === null || order === void 0 ? void 0 : order.client), orderNo: this.getOrderNo(shopifyOrder, shopifyFulfillment, order), cancelled: this.getCancelled(shopifyOrder, shopifyFulfillment, order), complete: shopifyFulfillment.shipment_status === 'delivered' || (order === null || order === void 0 ? void 0 : order.complete), statuslink: (order === null || order === void 0 ? void 0 : order.statuslink) || shopifyFulfillment.tracking_urls ? shopifyFulfillment.tracking_urls.join(',') : shopifyFulfillment.tracking_url, tracking_number: shopifyFulfillment.tracking_numbers ? shopifyFulfillment.tracking_numbers.join(',') : shopifyFulfillment.tracking_number, warehouse: shopifyFulfillment.location_id ? (_a = shopifyFulfillment.location_id) === null || _a === void 0 ? void 0 : _a.toString() : undefined, customFields: Object.assign(Object.assign({}, (order === null || order === void 0 ? void 0 : order.customFields) || {}), { notify_customer: ((_b = order === null || order === void 0 ? void 0 : order.customFields) === null || _b === void 0 ? void 0 : _b.notify_customer) || shopifyFulfillment.notify_customer, status: ((_c = order === null || order === void 0 ? void 0 : order.customFields) === null || _c === void 0 ? void 0 : _c.status) || shopifyFulfillment.status, shipment_status: ((_d = order === null || order === void 0 ? void 0 : order.customFields) === null || _d === void 0 ? void 0 : _d.shipment_status) || shopifyFulfillment.shipment_status, verified_email: ((_e = order === null || order === void 0 ? void 0 : order.customFields) === null || _e === void 0 ? void 0 : _e.verified_email) || ((_f = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _f === void 0 ? void 0 : _f.verified_email), accepts_marketing: ((_g = order === null || order === void 0 ? void 0 : order.customFields) === null || _g === void 0 ? void 0 : _g.accepts_marketing) || ((_h = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _h === void 0 ? void 0 : _h.accepts_marketing), fulfillment_status: ((_j = order === null || order === void 0 ? void 0 : order.customFields) === null || _j === void 0 ? void 0 : _j.fulfillment_status) || shopifyOrder.fulfillment_status, financial_status: ((_k = order === null || order === void 0 ? void 0 : order.customFields) === null || _k === void 0 ? void 0 : _k.financial_status) || shopifyOrder.financial_status, checkout_token: ((_l = order === null || order === void 0 ? void 0 : order.customFields) === null || _l === void 0 ? void 0 : _l.checkout_token) || shopifyOrder.checkout_token, cancelled_at: ((_m = order === null || order === void 0 ? void 0 : order.customFields) === null || _m === void 0 ? void 0 : _m.cancelled_at) || shopifyOrder.cancelled_at, order_id: ((_o = order === null || order === void 0 ? void 0 : order.customFields) === null || _o === void 0 ? void 0 : _o.order_id) || (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.id) }) });
        if (shopifyFulfillment.destination) {
            shopifyFulfillment = shopifyFulfillment;
            tracking.city = shopifyFulfillment.destination.city || (order === null || order === void 0 ? void 0 : order.city);
            tracking.destination_country_iso3 = shopifyFulfillment.destination.country_code || (order === null || order === void 0 ? void 0 : order.destination_country_iso3);
            tracking.phone = shopifyFulfillment.destination.phone;
            tracking.recipient = shopifyFulfillment.destination.name || (order === null || order === void 0 ? void 0 : order.recipient_notification);
            tracking.recipient_notification = shopifyFulfillment.destination.name || (order === null || order === void 0 ? void 0 : order.recipient_notification);
            tracking.street = shopifyFulfillment.destination.address1;
            tracking.zip_code = shopifyFulfillment.destination.zip;
            tracking.email = (shopifyFulfillment === null || shopifyFulfillment === void 0 ? void 0 : shopifyFulfillment.email) || (order === null || order === void 0 ? void 0 : order.email);
        }
        if (tracking.tracking_number && typeof tracking.tracking_number === 'string') {
            const { courier, trackingNumber } = await this.validateCourier(parcelLabSettings, tracking.tracking_number, tracking.courier);
            tracking.tracking_number = trackingNumber || tracking.tracking_number;
            tracking.courier = courier || tracking.courier;
        }
        if (!tracking.tracking_number || tracking.tracking_number.length === 0) {
            delete tracking.courier;
        }
        if (tracking.cancelled) {
            console.warn(`tracking cancelled "${tracking.cancelled}" at "${tracking.customFields.cancelled_at}" for order number "${tracking.orderNo}".`);
        }
        return tracking;
    }
    async transformOrder(shopifyAuth, parcelLabSettings, shopifyOrder) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const order = {
            articles: await this.transformLineItems(shopifyAuth, shopifyOrder, shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.line_items),
            city: (_a = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.shipping_address) === null || _a === void 0 ? void 0 : _a.city,
            client: await this.getClient(shopifyAuth),
            orderNo: this.getOrderNo(shopifyOrder),
            cancelled: this.getCancelled(shopifyOrder),
            complete: (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.fulfillment_status) === 'fulfilled',
            customerNo: (_c = (_b = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString(),
            deliveryNo: (_d = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.id) === null || _d === void 0 ? void 0 : _d.toString(),
            destination_country_iso3: (_e = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.shipping_address) === null || _e === void 0 ? void 0 : _e.country_code,
            email: (_f = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _f === void 0 ? void 0 : _f.email,
            language_iso3: await this.getLocaleCode(shopifyAuth, shopifyOrder),
            market: shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.source_name,
            order_date: new Date(shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.created_at),
            phone: (_g = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _g === void 0 ? void 0 : _g.phone,
            recipient: this.getName(shopifyOrder),
            recipient_notification: this.getName(shopifyOrder),
            statuslink: shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.order_status_url,
            street: (_h = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.shipping_address) === null || _h === void 0 ? void 0 : _h.address1,
            warehouse: (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.location_id) ? (_j = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.location_id) === null || _j === void 0 ? void 0 : _j.toString() : undefined,
            weight: (_k = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.total_weight) === null || _k === void 0 ? void 0 : _k.toString(),
            xid: (_l = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.id) === null || _l === void 0 ? void 0 : _l.toString(),
            zip_code: (_m = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.shipping_address) === null || _m === void 0 ? void 0 : _m.zip,
            customFields: {
                verified_email: (_o = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _o === void 0 ? void 0 : _o.verified_email,
                accepts_marketing: (_p = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _p === void 0 ? void 0 : _p.accepts_marketing,
                fulfillment_status: shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.fulfillment_status,
                financial_status: shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.financial_status,
                checkout_token: shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.checkout_token,
                cancelled_at: shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.cancelled_at,
            },
        };
        if (order.cancelled) {
            console.warn(`order cancelled "${order.cancelled}" at "${order.customFields.cancelled_at}" for order number "${order.orderNo}".`);
        }
        return order;
    }
    async transformLineItems(shopifyAuth, shopifyOrder, lineItems = []) {
        const articles = [];
        for (const lineItem of lineItems) {
            const article = {
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
    getOrderNo(shopifyOrder, shopifyFulfillment, order) {
        var _a;
        return (order === null || order === void 0 ? void 0 : order.orderNo) || ((_a = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.name) === null || _a === void 0 ? void 0 : _a.toString());
    }
    getCancelled(shopifyOrder, shopifyFulfillment, order) {
        if ((order === null || order === void 0 ? void 0 : order.cancelled) === true) {
            return true;
        }
        if ((shopifyFulfillment === null || shopifyFulfillment === void 0 ? void 0 : shopifyFulfillment.status) === 'cancelled') {
            return true;
        }
        if ((shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.cancelled_at) && typeof (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.cancelled_at) === 'string') {
            return true;
        }
        return false;
    }
    async getArticleUrl(shopifyAuth, shopifyOrder, product, prepend = 'https://') {
        const domain = await this.getShopDomain(shopifyAuth, shopifyOrder);
        let url = domain + '/products/' + product.handle;
        if (!url.startsWith('http')) {
            url = prepend + url;
        }
        return url;
    }
    async getShopDomain(shopifyAuth, shopifyOrder) {
        return this.getShopDomainFromNoteAttributes(shopifyOrder) || shopifyAuth.shop.domain;
    }
    getShopDomainFromNoteAttributes(shopifyOrder) {
        var _a;
        if (!(shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.note_attributes)) {
            return null;
        }
        for (const noteAttribute of shopifyOrder.note_attributes) {
            if (noteAttribute.name === 'domain') {
                return (_a = noteAttribute.value) === null || _a === void 0 ? void 0 : _a.toString();
            }
        }
        return null;
    }
    async getArticleNo(lineItem) {
        if (PREFER_SKU && lineItem.sku) {
            return lineItem.sku;
        }
        if (lineItem.barcode) {
            return lineItem.barcode;
        }
        if (lineItem.variant_id) {
            return lineItem.variant_id.toString();
        }
        if (lineItem.product_id) {
            return lineItem.product_id.toString();
        }
        return lineItem.id.toString();
    }
    async getClient(shopifyAuth) {
        return shopifyAuth.shop.name;
    }
    async getLocaleCode(shopifyAuth, shopifyOrder) {
        var _a, _b, _c, _d, _e;
        let langCode = this.getLocalCodeFromNoteAttributes(shopifyOrder) || (shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer_locale) || ((_a = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.billing_address) === null || _a === void 0 ? void 0 : _a.country_code) || ((_b = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.shipping_address) === null || _b === void 0 ? void 0 : _b.country_code) || ((_d = (_c = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _c === void 0 ? void 0 : _c.default_address) === null || _d === void 0 ? void 0 : _d.country_code) || ((_e = shopifyAuth === null || shopifyAuth === void 0 ? void 0 : shopifyAuth.shop) === null || _e === void 0 ? void 0 : _e.primary_locale);
        if (typeof langCode === 'string' && langCode.includes('-')) {
            langCode = langCode.split('-')[0];
        }
        return langCode;
    }
    getLocalCodeFromNoteAttributes(shopifyOrder) {
        var _a, _b;
        let locale = '';
        if (!(shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.note_attributes)) {
            return locale;
        }
        for (const noteAttribute of shopifyOrder.note_attributes) {
            if (noteAttribute.name === 'locale') {
                locale = (_a = noteAttribute.value) === null || _a === void 0 ? void 0 : _a.toString();
            }
            if (noteAttribute.name === 'site') {
                locale = locale || ((_b = noteAttribute.value) === null || _b === void 0 ? void 0 : _b.toString());
            }
        }
        return locale;
    }
    getName(shopifyOrder) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if ((_a = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _a === void 0 ? void 0 : _a.name) {
            return (_b = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _b === void 0 ? void 0 : _b.name;
        }
        if (((_c = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _c === void 0 ? void 0 : _c.first_name) || ((_d = shopifyOrder === null || shopifyOrder === void 0 ? void 0 : shopifyOrder.customer) === null || _d === void 0 ? void 0 : _d.last_name)) {
            if (((_e = shopifyOrder.customer) === null || _e === void 0 ? void 0 : _e.first_name) && ((_f = shopifyOrder.customer) === null || _f === void 0 ? void 0 : _f.last_name)) {
                return ((_g = shopifyOrder.customer) === null || _g === void 0 ? void 0 : _g.first_name) + ' ' + ((_h = shopifyOrder.customer) === null || _h === void 0 ? void 0 : _h.last_name);
            }
            else if ((_j = shopifyOrder.customer) === null || _j === void 0 ? void 0 : _j.first_name) {
                return (_k = shopifyOrder.customer) === null || _k === void 0 ? void 0 : _k.first_name;
            }
            else if ((_l = shopifyOrder.customer) === null || _l === void 0 ? void 0 : _l.last_name) {
                return (_m = shopifyOrder.customer) === null || _m === void 0 ? void 0 : _m.last_name;
            }
        }
        return undefined;
    }
    async getShopifyAuth(domain) {
        return this.shopify.findByDomain(domain);
    }
    async getProductData(shopifyAuth, shopifyOrder, lineItem) {
        try {
            const product = await this.product.getFromShopify(shopifyAuth, lineItem.product_id);
            const variant = await this.getVariant(product, lineItem.variant_id);
            return {
                articleNo: await this.getArticleNo(variant || lineItem),
                articleCategory: undefined,
                articleImageUrl: this.getProductImageSource(product, lineItem.variant_id),
                articleUrl: await this.getArticleUrl(shopifyAuth, shopifyOrder, product),
            };
        }
        catch (error) {
            this.logger.error('getProductData', error);
            return {
                articleNo: await this.getArticleNo(lineItem),
                articleCategory: undefined,
                articleImageUrl: undefined,
                articleUrl: undefined,
            };
        }
    }
    async getShopifyOrder(shopifyAuth, fulfillment) {
        if (!fulfillment.order_id) {
            this.logger.warn('getOrderData no order_id given!');
            return null;
        }
        try {
            const shopifyOrder = await this.order.getFromShopify(shopifyAuth, fulfillment.order_id, { status: 'any' });
            return shopifyOrder;
        }
        catch (error) {
            this.logger.error(`Error on getOrderData with order_id ${fulfillment.order_id} for shop ${shopifyAuth.myshopify_domain}`, error);
            return null;
        }
    }
    async getOrderData(shopifyAuth, parcelLabSettings, fulfillment, shopifyOrder) {
        if (!fulfillment.order_id) {
            this.logger.warn('getOrderData no order_id given!');
            return null;
        }
        try {
            return this.transformOrder(shopifyAuth, parcelLabSettings, shopifyOrder);
        }
        catch (error) {
            this.logger.error(`Error on getOrderData with order_id ${fulfillment.order_id} for shop ${shopifyAuth.myshopify_domain}`, error);
            return null;
        }
    }
    async getCheckout(shopifyAuth, checkoutToken) {
        try {
            const checkout = this.checkout.getFromShopify(shopifyAuth, checkoutToken, {});
            return checkout;
        }
        catch (error) {
            this.logger.error(error);
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
    handleCourierName(courier) {
        if (typeof courier === 'string') {
            courier = courier.trim().toLowerCase().replace(/\s/g, "-");
        }
        if (courier === 'other' || courier === 'any' || courier === 'std') {
            courier = undefined;
        }
        return courier;
    }
    async validateCourier(parcelLabSettings, trackingNumber, courier) {
        var _a;
        if (!trackingNumber || typeof trackingNumber !== 'string') {
            return { courier, trackingNumber };
        }
        let detectedCourier;
        if (parcelLabSettings.fallback_detect_carrier_by_tracking_more && parcelLabSettings.tracking_more_token) {
            if (!courier) {
                try {
                    const trackingMore = new tracking_more_service_1.TrackingMoreService(parcelLabSettings.tracking_more_token);
                    const detectResult = await trackingMore.detectCarrier(trackingNumber);
                    if (detectResult.meta.code === 200 && ((_a = detectResult.data) === null || _a === void 0 ? void 0 : _a.length) > 0 && detectResult.data[0].code) {
                        detectedCourier = detectResult.data[0].code;
                    }
                    this.logger.debug(`[validateCourier] Detected courier from tracking more: "${detectedCourier}"`, detectResult);
                }
                catch (error) {
                    this.logger.error(error);
                }
            }
        }
        return { courier: (detectedCourier || courier), trackingNumber };
    }
    async getCourier(parcelLabSettings, shopifyFulfillment, order, shopifyOrder, shopifyCheckout) {
        var _a, _b;
        let courier = (shopifyFulfillment === null || shopifyFulfillment === void 0 ? void 0 : shopifyFulfillment.tracking_company) || (order === null || order === void 0 ? void 0 : order.courier);
        courier = this.handleCourierName(courier);
        if (parcelLabSettings.prefer_checkout_shipping_method || !courier) {
            courier = this.transformCheckoutShippingToCourier(((_a = shopifyCheckout === null || shopifyCheckout === void 0 ? void 0 : shopifyCheckout.shipping_line) === null || _a === void 0 ? void 0 : _a.title) || ((_b = shopifyCheckout === null || shopifyCheckout === void 0 ? void 0 : shopifyCheckout.shipping_rate) === null || _b === void 0 ? void 0 : _b.title), courier);
        }
        return courier;
    }
    transformCheckoutShippingToCourier(shippingMethodTitle, fallbackName) {
        let courier;
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
                includes: ['colis', 'priv'],
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
};
ParcelLabTrackingService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(nest_shopify_1.SHOPIFY_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, nest_shopify_1.EventService,
        nest_shopify_1.ShopifyConnectService,
        settings_service_1.SettingsService,
        nest_shopify_1.ShopService,
        nest_shopify_1.ProductsService,
        nest_shopify_1.CheckoutsService,
        nest_shopify_1.OrdersService])
], ParcelLabTrackingService);
exports.ParcelLabTrackingService = ParcelLabTrackingService;
//# sourceMappingURL=tracking.service.js.map