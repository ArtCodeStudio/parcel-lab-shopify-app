import { Injectable, Inject } from '@nestjs/common';
import { clearObject } from '../../utils/clear-object';
import {
  ParcelLabApi,
  ParcellabOrder,
  ParcellabArticle,
  ParcellabSearchResponse,
  ParcellabTracking,
} from 'parcellab';
import {
  ParcelLabSettings,
  ParcelLabSettingsLanguageOverride,
} from '../interfaces';
import { SettingsService } from '../settings/settings.service';
import {
  DebugService,
  EventService,
  Interfaces,
  ShopService,
  ProductsService,
  OrdersService,
  TransactionsService,
  ShopifyConnectService,
  IShopifyConnect,
  SHOPIFY_MODULE_OPTIONS,
  ShopifyModuleOptions,
} from 'nest-shopify';

// Options TODO make this configurable?
const PREFER_SKU = true;

type AnyWebhookOrder =
  | Interfaces.WebhookOrdersFulfilled
  | Interfaces.WebhookOrdersPaid
  | Interfaces.WebhookOrdersPartiallyFulfilled
  | Interfaces.WebhookOrdersUpdated
  | Interfaces.WebhookOrdersCreate;

type AnyWebhookFulfillment =
  | Interfaces.WebhookFulfillmentCreate
  | Interfaces.WebhookFulfillmentUpdate;

@Injectable()
export class ParcelLabTrackingService {
  protected logger = new DebugService('parcelLab:ParcelLabTrackingService');

  protected testMode = false;

  constructor(
    @Inject(SHOPIFY_MODULE_OPTIONS)
    protected readonly shopifyModuleOptions: ShopifyModuleOptions,
    protected readonly shopifyEvents: EventService,
    protected readonly shopify: ShopifyConnectService,
    protected readonly parcelLabSettings: SettingsService,
    protected readonly shop: ShopService,
    protected readonly product: ProductsService,
    protected readonly order: OrdersService,
    protected readonly transaction: TransactionsService,
  ) {
    // TODO add this to the pacelLab settings
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
  public async list(
    myshopifyDomain: string,
    search?: string,
    page?: number,
    size?: number,
  ): Promise<ParcellabSearchResponse> {
    const settings = await this.parcelLabSettings.findByShopDomain(
      myshopifyDomain,
    );
    if (!settings) {
      this.logger.debug(`[${myshopifyDomain}] No parcelLab settings found.`);
      return;
    }
    const api = new ParcelLabApi(settings.user, settings.token);
    return api.search(search, page, size);
  }

  protected addEventListeners() {
    // orders
    this.shopifyEvents.on(
      `webhook:orders/cancelled`,
      this.onOrderCancelled.bind(this),
    );
    this.shopifyEvents.on(
      `webhook:orders/create`,
      this.onOrderCreate.bind(this),
    );
    this.shopifyEvents.on(
      `webhook:orders/fulfilled`,
      this.onOrderFulfilled.bind(this),
    );
    this.shopifyEvents.on(`webhook:orders/paid`, this.onOrderPaid.bind(this));
    this.shopifyEvents.on(
      `webhook:orders/partially_fulfilled`,
      this.onOrderPartiallyFulfilled.bind(this),
    );
    this.shopifyEvents.on(
      `webhook:orders/updated`,
      this.onOrderUpdated.bind(this),
    );
    this.shopifyEvents.on(
      `webhook:orders/delete`,
      this.onOrderDelete.bind(this),
    );

    // fulfillments
    this.shopifyEvents.on(
      `webhook:fulfillments/create`,
      this.onFulfillmentsCreate.bind(this),
    );
    this.shopifyEvents.on(
      `webhook:fulfillments/update`,
      this.onFulfillmentsUpdate.bind(this),
    );
  }

  protected async onOrderCancelled(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersCancelled,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrderCancelled result: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(`[${myshopifyDomain}] onOrderCancelled error`, error);
    }
  }
  protected async onOrderCreate(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersCreate,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrderCreate result: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(`[${myshopifyDomain}] onOrderCreate error`, error);
    }
  }
  protected async onOrderFulfilled(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersFulfilled,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrderFulfilled result: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(`[${myshopifyDomain}] onOrderFulfilled error`, error);
    }
  }
  protected async onOrderPaid(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersPaid,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrderPaid result: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(`[${myshopifyDomain}] onOrderPaid error`, error);
    }
  }
  protected async onOrderPartiallyFulfilled(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersPartiallyFulfilled,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrdonOrderPartiallyFulfillederUpdated: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(
        `[${myshopifyDomain}] onOrderPartiallyFulfilled error`,
        error,
      );
    }
  }
  protected async onOrderUpdated(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersUpdated,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrderUpdated result: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(`[${myshopifyDomain}] onOrderUpdated error:`, error);
    }
  }
  protected async onOrderDelete(
    myshopifyDomain: string,
    data: Interfaces.WebhookOrdersCreate,
  ) {
    try {
      const { orderResults } = await this.updateOrCreateOrder(
        myshopifyDomain,
        data,
      );
      this.logger.debug(
        `[${myshopifyDomain}] onOrderDelete result: %O`,
        orderResults,
      );
    } catch (error) {
      this.logger.error(`[${myshopifyDomain}] onOrderDelete error:`, error);
    }
  }

  protected async onFulfillmentsCreate(
    myshopifyDomain: string,
    data: Interfaces.WebhookFulfillmentCreate,
  ) {
    try {
      const result = await this.createTracking(myshopifyDomain, data);
      this.logger.debug(
        `[${myshopifyDomain}] onFulfillmentsCreate result: %O`,
        result,
      );
    } catch (error) {
      this.logger.error(
        `[${myshopifyDomain}] onFulfillmentsCreate error: `,
        error,
      );
    }
  }
  protected async onFulfillmentsUpdate(
    myshopifyDomain: string,
    data: Interfaces.WebhookFulfillmentUpdate,
  ) {
    try {
      // const result = await this.updateTracking(myshopifyDomain, data);
      const result = await this.createTracking(myshopifyDomain, data);
      this.logger.debug(
        `[${myshopifyDomain}] onFulfillmentsUpdate result: %O`,
        result,
      );
    } catch (error) {
      this.logger.error(
        `[${myshopifyDomain}] onFulfillmentsUpdate error: `,
        error,
      );
    }
  }

  protected async getSettings(myshopifyDomain: string) {
    const settingsDocument = await this.parcelLabSettings.findByShopDomain(
      myshopifyDomain,
    );
    const settings = settingsDocument.toObject();
    if (!settings) {
      throw new Error(`[${myshopifyDomain}] No parcelLab settings found`);
    }
    return settings;
  }

  protected async createTracking(
    myshopifyDomain: string,
    shopifyFulfillment: AnyWebhookFulfillment,
    overwrite: Partial<ParcellabOrder> = {},
  ) {
    const settings = await this.getSettings(myshopifyDomain);
    const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
    const api = new ParcelLabApi(settings.user, settings.token);
    let tracking = await this.transformTracking(
      settings,
      shopifyAuth,
      shopifyFulfillment,
    );

    // const customFields = getCustomFields
    const customFields = {
      ...(tracking?.customFields || {}),
      ...(overwrite?.customFields || {}),
      ...(settings?.customFields || {}),
    };

    this.transformCustomFields(customFields);

    tracking = { ...tracking, ...overwrite, customFields };

    let result: string[] = [];
    if (
      tracking.orderNo &&
      tracking.street &&
      tracking.city &&
      tracking.zip_code
    ) {
      if (!tracking.language_iso3) {
        this.logger.warn(
          `[${myshopifyDomain}] [${
            tracking.client
          }] Locale code is missing for order with order name: "${
            shopifyFulfillment?.name ||
            shopifyFulfillment?.order_id ||
            tracking?.customFields?.order_id
          }"`,
        );
      }
      result = await api.createTracking(tracking, this.testMode);
    } else {
      result = ['Missing data.'];
    }

    return result;
  }

  /**
   * Update tracking is not supported by parcellab, we can only submit a tracking number once
   * This method only updates the order
   */
  protected async updateTracking(
    myshopifyDomain: string,
    shopifyFulfillment: AnyWebhookFulfillment,
    overwrite: Partial<ParcellabOrder> = {},
  ) {
    const settings = await this.getSettings(myshopifyDomain);
    const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
    const api = new ParcelLabApi(settings.user, settings.token);
    let tracking = await this.transformTracking(
      settings,
      shopifyAuth,
      shopifyFulfillment,
    );
    const customFields = {
      ...(tracking?.customFields || {}),
      ...(overwrite?.customFields || {}),
      ...(settings?.customFields || {}),
    };

    this.transformCustomFields(customFields);

    tracking = { ...tracking, ...overwrite, customFields };

    let result: string[] = [];
    if (
      tracking.orderNo &&
      tracking.street &&
      tracking.city &&
      tracking.zip_code
    ) {
      if (!tracking.language_iso3) {
        this.logger.warn(
          `[${
            tracking.client
          }] Locale code is missing for order with order name: "${
            shopifyFulfillment?.name ||
            shopifyFulfillment?.order_id ||
            tracking?.customFields?.order_id
          }"`,
        );
      }
      result = await api.createOrUpdateOrder(tracking, this.testMode);
    } else {
      result = ['Missing data.'];
    }

    return result;
  }

  protected async updateOrCreateOrder(
    myshopifyDomain: string,
    shopifyOrder: AnyWebhookOrder,
    overwrite: Partial<ParcellabOrder> = {},
  ) {
    const settings = await this.getSettings(myshopifyDomain);
    const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
    const api = new ParcelLabApi(settings.user, settings.token);

    let order: ParcellabOrder = await this.transformOrder(
      settings,
      shopifyAuth,
      shopifyOrder,
    );

    order = { ...order, ...overwrite };
    let orderResults: string[] = [];
    order = clearObject(order);
    if (order.orderNo && order.street && order.city && order.zip_code) {
      if (!order.language_iso3) {
        this.logger.warn(
          `[${myshopifyDomain}] [${
            order.client
          }] Locale code is missing for order with order name: "${
            shopifyOrder?.name ||
            shopifyOrder?.number ||
            shopifyOrder?.id ||
            order?.customFields?.order_id
          }"`,
        );
      }

      try {
        orderResults = await api.createOrUpdateOrder(order, this.testMode);
      } catch (error) {
        this.logger.error(
          `[${myshopifyDomain}] updateOrCreateOrder createOrUpdateOrder error`,
          error,
        );
        this.logger.error('Failed order data: ', order);
        orderResults.push(error.message);
      }
    } else {
      orderResults.push('Missing data.');
    }

    return {
      orderResults,
      order,
    };
  }

  /**
   * Transform shopify fulfillment to a parcel lab compatible tracking object
   * @param shopifyAuth
   * @param shopifyFulfillment
   * @param order Currently only used in updateOrCreateOrder because we already have the order object there and do not need to fetch in again
   */
  protected async transformTracking(
    parcelLabSettings: ParcelLabSettings,
    shopifyAuth: IShopifyConnect,
    shopifyFulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment,
    shopifyOrder?: Partial<Interfaces.Order>,
    order?: ParcellabOrder,
  ): Promise<ParcellabTracking> {
    if (!shopifyOrder) {
      shopifyOrder = await this.getShopifyOrder(
        shopifyAuth,
        shopifyFulfillment,
      );
    }
    if (!order && shopifyOrder) {
      order =
        (await this.getOrderData(
          parcelLabSettings,
          shopifyAuth,
          shopifyFulfillment,
          shopifyOrder,
        )) || undefined;
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
    const tracking: Partial<ParcellabTracking> = {
      ...(order || {}),
      // The line items from are fullfilment containing ALL orders inklucing the stoned line items
      // articles: await this.transformLineItems(
      //   shopifyAuth,
      //   shopifyOrder,
      //   shopifyFulfillment.line_items,
      // ),
      branchDelivery: false, // TODO set this true of this is a store / branch delivery (Filiallieferung)
      courier: await this.getCourier(
        parcelLabSettings,
        shopifyFulfillment,
        order,
      ),
      client: (await this.getClient(shopifyAuth)) || order?.client,
      orderNo: await this.getOrderNo(shopifyOrder, shopifyFulfillment, order),
      cancelled: this.getCancelled(shopifyOrder, shopifyFulfillment, order),
      complete:
        shopifyFulfillment.shipment_status === 'delivered' || order?.complete,
      statuslink:
        order?.statuslink || shopifyFulfillment.tracking_urls
          ? shopifyFulfillment.tracking_urls.join(',')
          : shopifyFulfillment.tracking_url,
      tracking_number: shopifyFulfillment.tracking_numbers
        ? shopifyFulfillment.tracking_numbers.join(',')
        : shopifyFulfillment.tracking_number,
      warehouse: shopifyFulfillment.location_id
        ? shopifyFulfillment.location_id?.toString()
        : undefined,
      customFields: {
        notify_customer: shopifyFulfillment.notify_customer || false,
        line_items: shopifyFulfillment.line_items,
      },
    };

    const customFields = {
      ...(tracking?.customFields || {}),
      ...(order?.customFields || {}),
      ...(parcelLabSettings?.customFields || {}),
    };

    this.transformCustomFields(customFields);

    tracking.customFields = customFields;

    if ((shopifyFulfillment as AnyWebhookFulfillment).destination) {
      shopifyFulfillment = shopifyFulfillment as AnyWebhookFulfillment;
      tracking.city = shopifyFulfillment.destination.city || order?.city;
      tracking.destination_country_iso3 =
        shopifyFulfillment.destination.country_code ||
        order?.destination_country_iso3;
      tracking.phone = shopifyFulfillment.destination.phone;
      tracking.recipient =
        shopifyFulfillment.destination.name || order?.recipient_notification;
      tracking.recipient_notification =
        shopifyFulfillment.destination.name || order?.recipient_notification;
      tracking.street = shopifyFulfillment.destination.address1;
      tracking.zip_code = shopifyFulfillment.destination.zip;

      tracking.email = shopifyFulfillment?.email || order?.email;
    }

    if (
      tracking.tracking_number &&
      typeof tracking.tracking_number === 'string'
    ) {
      const { courier, trackingNumber } = await this.validateCourier(
        parcelLabSettings,
        tracking.tracking_number,
        tracking.courier,
      );
      tracking.tracking_number = trackingNumber || tracking.tracking_number;
      tracking.courier = courier || tracking.courier;
    }
    // Delete courier property if we do not have a tracking number
    if (!tracking.tracking_number || tracking.tracking_number.length === 0) {
      delete tracking.courier;
    }

    if (this.shopifyModuleOptions.app.environment !== 'production') {
      tracking.tracking_number = 'dev_' + tracking.tracking_number;
    }

    if (tracking.cancelled) {
      this.logger.warn(
        `tracking cancelled "${tracking.cancelled}" at "${tracking.customFields.cancelled_at}" for order number "${tracking.orderNo}".`,
      );
    }

    return tracking as ParcellabTracking;
  }

  protected async transformOrder(
    parcelLabSettings: ParcelLabSettings,
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
  ): Promise<ParcellabOrder> {
    // this.logger.debug('transactions', transactions);

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
     * * courier
     * * tracking_number
     */
    const order: ParcellabOrder = {
      articles: await this.transformLineItems(
        shopifyAuth,
        shopifyOrder,
        shopifyOrder.line_items,
        shopifyOrder.refunds,
      ),
      city: shopifyOrder?.shipping_address?.city,
      client: await this.getClient(shopifyAuth),
      orderNo: await this.getOrderNo(shopifyOrder),
      cancelled: this.getCancelled(shopifyOrder),
      complete: shopifyOrder?.fulfillment_status === 'fulfilled',
      customerNo: shopifyOrder?.customer?.id.toString(),
      deliveryNo: await this.getDeliveryNo(shopifyOrder),
      destination_country_iso3: shopifyOrder?.shipping_address?.country_code,
      email: shopifyOrder?.customer?.email,
      language_iso3: await this.getLocaleCode(
        shopifyAuth,
        shopifyOrder,
        parcelLabSettings.languageOverrides,
      ),
      market: shopifyOrder?.source_name,
      order_date: new Date(shopifyOrder?.created_at),
      phone: shopifyOrder?.customer?.phone,
      recipient: this.getName(shopifyOrder),
      recipient_notification: this.getName(shopifyOrder),
      statuslink: shopifyOrder?.order_status_url,
      street: shopifyOrder?.shipping_address?.address1,
      warehouse: shopifyOrder?.location_id
        ? shopifyOrder?.location_id.toString()
        : undefined,
      weight: shopifyOrder?.total_weight.toString(),
      xid: shopifyOrder?.id.toString(), // TODO CHECKME
      zip_code: shopifyOrder?.shipping_address?.zip,
      customFields: {
        customer: {
          verified_email: shopifyOrder?.customer.verified_email,
          accepts_marketing: shopifyOrder?.customer.accepts_marketing,
        },

        line_items: shopifyOrder?.line_items,
        refunds: shopifyOrder?.refunds,
        shipping_lines: shopifyOrder?.shipping_lines,

        fulfillment_status: shopifyOrder?.fulfillment_status,
        financial_status: shopifyOrder?.financial_status,
        cancelled_at: shopifyOrder?.cancelled_at,

        // Used for notification template variables
        billing_address:
          shopifyOrder?.billing_address || shopifyOrder?.shipping_address,
      },
    };

    const customFields = {
      ...(order?.customFields || {}),
      ...(parcelLabSettings?.customFields || {}),
    };

    this.transformCustomFields(customFields);

    order.customFields = customFields;

    if (order.cancelled) {
      this.logger.warn(
        `Order cancelled "${order.cancelled}" at "${order.customFields.cancelled_at}" for order number "${order.orderNo}".`,
      );
    }

    return order;
  }

  protected async transformLineItems(
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
    lineItems:
      | Interfaces.DraftOrder['line_items']
      | Interfaces.Order['line_items'] = [],
    refunds: Interfaces.Order['refunds'] = [],
  ): Promise<ParcellabArticle[]> {
    const articles: ParcellabArticle[] = [];

    // Line items without refunds
    const filteredLineItems = await this.filterRefundLineItems(
      lineItems,
      refunds,
    );

    for (const lineItem of filteredLineItems) {
      const article: ParcellabArticle = {
        articleName: (
          lineItem.title.trim() +
          ' ' +
          lineItem.variant_title.trim()
        ).trim(),
        articleNo: await this.getArticleNo(lineItem),
        quantity: lineItem.quantity,
      };
      const { articleNo, articleCategory, articleImageUrl, articleUrl } =
        await this.getProductData(shopifyAuth, shopifyOrder, lineItem);

      article.articleNo = articleNo || article.articleNo;
      article.articleCategory = articleCategory;
      article.articleImageUrl = articleImageUrl;
      article.articleUrl = articleUrl;
      articles.push(clearObject(article));
    }
    return articles;
  }

  protected async filterRefundLineItems(
    lineItems:
      | Interfaces.DraftOrder['line_items']
      | Interfaces.Order['line_items'],
    refunds: Interfaces.Order['refunds'],
  ) {
    const filteredLineItems: Interfaces.Order['line_items'] = [];
    const refundLineItems = await this.getRefundLineItems(refunds);

    for (const lineItem of lineItems) {
      const equalRefundLineItems = refundLineItems.filter(
        (refundLineItem) => refundLineItem.line_item_id === lineItem.id,
      );
      for (const equalRefundLineItem of equalRefundLineItems) {
        lineItem.quantity -= equalRefundLineItem.quantity;
      }
      if (lineItem.quantity > 0) {
        filteredLineItems.push(clearObject(lineItem));
      }
    }

    return filteredLineItems;
  }

  protected async getRefundLineItems(refunds: Interfaces.Order['refunds']) {
    const refundLineItems: Interfaces.RefundLineItem[] = [];
    for (const refund of refunds) {
      refundLineItems.push(...clearObject(refund.refund_line_items));
    }
    return refundLineItems;
  }

  protected async getClient(shopifyAuth: IShopifyConnect) {
    return shopifyAuth.shop.name;
  }

  protected async getOrderNo(
    shopifyOrder: Partial<Interfaces.Order>,
    shopifyFulfillment?: AnyWebhookFulfillment | Interfaces.Fulfillment,
    order?: ParcellabOrder,
  ) {
    if (order?.orderNo) {
      return order.orderNo;
    }
    let prefix = '';
    if (this.shopifyModuleOptions.app.environment !== 'production') {
      prefix = 'dev_';
    }
    return prefix + shopifyOrder?.name?.toString();
  }

  protected getCancelled(
    shopifyOrder?: Partial<Interfaces.Order>,
    shopifyFulfillment?: AnyWebhookFulfillment | Interfaces.Fulfillment,
    order?: ParcellabOrder,
  ) {
    if (order?.cancelled === true) {
      return true;
    }
    if (shopifyFulfillment?.status === 'cancelled') {
      return true;
    }
    if (
      shopifyOrder?.cancelled_at &&
      typeof shopifyOrder?.cancelled_at === 'string'
    ) {
      return true;
    }
    return false;
  }

  protected async getArticleUrl(
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
    product: Partial<Interfaces.Product>,
    prepend = 'https://',
  ): Promise<string> {
    const domain = await this.getShopDomain(shopifyAuth, shopifyOrder);
    let url = domain + '/products/' + product.handle;
    if (!url.startsWith('http')) {
      url = prepend + url;
    }
    return url;
  }

  protected async getShopDomain(
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
  ): Promise<string> {
    return (
      this.getShopDomainFromNoteAttributes(shopifyOrder) ||
      shopifyAuth.shop.domain
    );
  }

  /**
   * Special case (for a private client) if the real domain was passed via additional note attributes
   * @param shopifyOrder
   */
  protected getShopDomainFromNoteAttributes(
    shopifyOrder: Partial<Interfaces.Order>,
  ) {
    if (!shopifyOrder?.note_attributes) {
      return null;
    }
    for (const noteAttribute of shopifyOrder.note_attributes) {
      if (noteAttribute.name === 'domain') {
        return noteAttribute.value?.toString();
      }
    }
    return null;
  }

  protected async getArticleNo(
    lineItem:
      | Interfaces.DraftLineItem
      | Interfaces.LineItem
      | Interfaces.ProductVariant,
  ): Promise<string> {
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

  protected async getDeliveryNo(shopifyOrder: Partial<Interfaces.Order>) {
    let prefix = '';
    if (this.shopifyModuleOptions.app.environment !== 'production') {
      prefix = 'dev_';
    }
    return prefix + shopifyOrder.id.toString(); // TODO CHECKME
  }

  protected async getLocaleCode(
    shopifyAuth: IShopifyConnect,
    shopifyOrder?: Partial<Interfaces.Order>,
    languageOverrides?: ParcelLabSettingsLanguageOverride[],
  ) {
    let langCode =
      this.getLocaleCodeFromNoteAttributes(shopifyOrder) ||
      shopifyOrder?.customer_locale ||
      shopifyOrder?.billing_address?.country_code ||
      shopifyOrder?.shipping_address?.country_code ||
      shopifyOrder?.customer?.default_address?.country_code ||
      shopifyAuth?.shop?.primary_locale;
    if (typeof langCode === 'string' && langCode.includes('-')) {
      langCode = langCode.split('-')[0];
    }
    if (languageOverrides && languageOverrides.length > 0) {
      for (const override of languageOverrides) {
        if (override.from === langCode && override.to) {
          langCode = override.to;
          break;
        }
      }
    }
    return langCode;
  }

  /**
   * Special case (for a private client) if the locale code was passed via additional note attributes
   * @param shopifyOrder
   */
  protected getLocaleCodeFromNoteAttributes(
    shopifyOrder?: Partial<Interfaces.Order>,
  ) {
    let locale = '';
    if (!shopifyOrder?.note_attributes) {
      return locale;
    }
    for (const noteAttribute of shopifyOrder.note_attributes) {
      if (noteAttribute.name === 'locale') {
        locale = noteAttribute.value?.toString();
      }
      if (noteAttribute.name === 'site') {
        locale = locale || noteAttribute.value?.toString();
      }
    }
    return locale;
  }

  protected getName(
    shopifyOrder: Partial<Interfaces.Order>,
  ): string | undefined {
    if (shopifyOrder?.customer?.name) {
      return shopifyOrder?.customer?.name;
    }

    if (
      shopifyOrder?.customer?.first_name ||
      shopifyOrder?.customer?.last_name
    ) {
      if (
        shopifyOrder.customer?.first_name &&
        shopifyOrder.customer?.last_name
      ) {
        return (
          shopifyOrder.customer?.first_name +
          ' ' +
          shopifyOrder.customer?.last_name
        );
      } else if (shopifyOrder.customer?.first_name) {
        return shopifyOrder.customer?.first_name;
      } else if (shopifyOrder.customer?.last_name) {
        return shopifyOrder.customer?.last_name;
      }
    }
    return undefined;
  }

  protected transformCustomFields(
    customFields: ParcellabTracking['customFields'],
  ) {
    customFields['no-notify'] = customFields['no-notify'] || false;

    if (Array.isArray(customFields.line_items)) {
      for (const lineItem of customFields.line_items) {
        delete lineItem.admin_graphql_api_id;

        if (Array.isArray(lineItem.properties)) {
          const properties: any = {};
          for (const property of lineItem.properties) {
            if (property.name && property.value) {
              properties[property.name] = property.value;
            }
          }
          lineItem.properties = properties;
        }
      }
    }

    if (customFields.transactions) {
      delete customFields.transactions;
    }

    return customFields;
  }

  protected async getShopifyAuth(domain: string) {
    return this.shopify.findByDomain(domain);
  }

  protected async getProductData(
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
    lineItem: Interfaces.LineItem,
  ): Promise<Partial<ParcellabArticle>> {
    try {
      const product = await this.product.getFromShopify(
        shopifyAuth,
        lineItem.product_id,
      );
      const variant = await this.getVariant(product, lineItem.variant_id);
      return {
        articleNo: await this.getArticleNo(variant || lineItem), // TODO make configurable what the articleNo should be
        articleCategory: undefined, // TODO get the collections of a product
        articleImageUrl: this.getProductImageSource(
          product,
          lineItem.variant_id,
        ),
        articleUrl: await this.getArticleUrl(
          shopifyAuth,
          shopifyOrder,
          product,
        ),
      };
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

  protected async getShopifyOrder(
    shopifyAuth: IShopifyConnect,
    fulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment,
  ): Promise<Partial<Interfaces.Order> | null> {
    if (!fulfillment.order_id) {
      this.logger.warn('getOrderData no order_id given!');
      return null;
    }
    try {
      const shopifyOrder = await this.order.getFromShopify(
        shopifyAuth,
        fulfillment.order_id,
        { status: 'any' } as any,
      ); // By default archived orders are not found by the api
      return shopifyOrder;
    } catch (error) {
      this.logger.error(
        `[${shopifyAuth.myshopify_domain}] Error on getOrderData with order_id ${fulfillment.order_id}`,
        error,
      );
      return null;
    }
  }

  protected async getOrderData(
    settings: ParcelLabSettings,
    shopifyAuth: IShopifyConnect,
    fulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment,
    shopifyOrder: Partial<Interfaces.Order>,
  ): Promise<ParcellabOrder | null> {
    if (!fulfillment.order_id) {
      this.logger.warn('getOrderData no order_id given!');
      return null;
    }
    try {
      return this.transformOrder(settings, shopifyAuth, shopifyOrder);
    } catch (error) {
      this.logger.error(
        `[${shopifyAuth.myshopify_domain}] Error on getOrderData with order_id ${fulfillment.order_id}`,
        error,
      );
      return null;
    }
  }

  protected async getVariant(
    product: Partial<Interfaces.Product>,
    variant_id: number,
  ): Promise<Interfaces.ProductVariant | null> {
    for (const variant of product.variants) {
      if (variant.id === variant_id) {
        return variant;
      }
    }
    return null;
  }

  protected getProductImageSource(
    product: Partial<Interfaces.Product>,
    variant_id: number,
  ) {
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
      courier = courier.trim().toLowerCase().replace(/\s/g, '-');
    }
    if (courier === 'other' || courier === 'any' || courier === 'std') {
      courier = undefined;
    }
    return courier;
  }

  protected async validateCourier(
    parcelLabSettings: ParcelLabSettings,
    trackingNumber?: string,
    courier?: string,
  ) {
    if (!trackingNumber || typeof trackingNumber !== 'string') {
      return { courier, trackingNumber };
    }

    return { courier: courier, trackingNumber };
  }

  protected async getCourier(
    parcelLabSettings: ParcelLabSettings,
    shopifyFulfillment?: AnyWebhookFulfillment | Interfaces.Fulfillment | null,
    order?: ParcellabOrder | null,
    shopifyOrder?: Partial<Interfaces.Order>,
    shopifyCheckout?: Partial<Interfaces.Checkout>,
  ) {
    let courier = shopifyFulfillment?.tracking_company || order?.courier;
    courier = this.handleCourierName(courier);
    // If this option is true we prefer the courier from the shipping method title the customer has selected in the checkout process otherwise this is just the fallback
    if (parcelLabSettings.prefer_checkout_shipping_method || !courier) {
      courier = this.transformCheckoutShippingToCourier(
        shopifyCheckout?.shipping_line?.title ||
          shopifyCheckout?.shipping_rate?.title,
        courier,
      );
    }

    return courier;
  }

  protected transformCheckoutShippingToCourier(
    shippingMethodTitle: string,
    fallbackName?: string,
  ) {
    let courier: string | undefined;
    if (!shippingMethodTitle) {
      courier = fallbackName;
      return courier;
    }
    courier = this.handleCourierName(shippingMethodTitle);

    const search = [
      {
        includes: ['dhl', 'express'],
        corresponds: 'dhl-express',
      },
      {
        includes: ['dhl', 'germany'],
        corresponds: 'dhl-germany',
      },
      {
        includes: ['dhl', 'de'],
        corresponds: 'dhl-germany',
      },
      {
        includes: ['dhl'],
        corresponds: 'dhl',
      },
      {
        includes: ['dpd', 'express'],
        corresponds: 'dpd-express',
      },
      {
        includes: ['dpd'],
        corresponds: 'dpd',
      },
      {
        includes: ['hermes'],
        corresponds: 'hermes',
      },
      {
        includes: ['wn', 'direct'],
        corresponds: 'wn-direct',
      },
      {
        includes: ['colis', 'priv'], // Colis Privé
        corresponds: 'colisprivee',
      },
      {
        includes: ['asendia'],
        corresponds: 'asendia',
      },
      {
        includes: ['gls'],
        corresponds: 'gls',
      },
      {
        includes: ['ontrac'],
        corresponds: 'ontrac',
      },
      {
        includes: ['fedex'],
        corresponds: 'fedex',
      },
      {
        includes: ['tnt'],
        corresponds: 'tnt',
      },
      {
        includes: ['liefery'],
        corresponds: 'liefery',
      },
      {
        includes: ['chronopost'],
        corresponds: 'chronopost',
      },
      {
        includes: ['mondial', 'relay'],
        corresponds: 'mondial-relay',
      },
      {
        includes: ['seur'],
        corresponds: 'seur',
      },
      {
        includes: ['poczta', 'polska'],
        corresponds: 'poczta-polska',
      },
      {
        includes: ['ppl'],
        corresponds: 'ppl',
      },
      {
        includes: ['pošta'],
        corresponds: 'pošta',
      },
      {
        includes: ['post'],
        corresponds: 'post',
      },
      {
        includes: ['ups', 'express'],
        corresponds: 'ups-express',
      },
      {
        includes: ['ups'],
        corresponds: 'ups',
      },
    ];

    for (const curSearch of search) {
      const match = curSearch.includes.every((item) => courier.includes(item));
      if (match) {
        courier = curSearch.corresponds;
        return courier;
      }
    }

    return fallbackName;
  }
}
