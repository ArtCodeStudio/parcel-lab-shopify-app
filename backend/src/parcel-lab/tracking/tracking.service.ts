import { Injectable, Inject } from '@nestjs/common';
import { ParcelLabApi } from '../api/parcel-lab-api';
import {
  ParcellabOrder,
  ParcellabTracking,
  ParcellabArticle,
} from '../api/interfaces';
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
import { ParcelLabSettings } from 'parcel-lab/interfaces/settings';

type AnyWebhookOrder =
  | Interfaces.WebhooksReponse.WebhookOrdersFulfilled
  | Interfaces.WebhooksReponse.WebhookOrdersPaid
  | Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled
  | Interfaces.WebhooksReponse.WebhookOrdersUpdated
  | Interfaces.WebhooksReponse.WebhookOrdersCreate;

type AnyWebhookFulfillment =
  | Interfaces.WebhooksReponse.WebhookFulfillmentCreate
  | Interfaces.WebhooksReponse.WebhookFulfillmentUpdate;

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
    // this.testMode = !!this.shopifyModuleOptions.app.debug;
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
  ) {
    const settings = await this.parcelLabSettings.findByShopDomain(
      myshopifyDomain,
    );
    if (!settings) {
      this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
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
    this.shopifyEvents.on(
      `webhook:order_transactions/create`,
      this.onOrderTransactionCreate.bind(this),
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

  // async onDraftOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
  //     this.logger.debug('onDraftOrderCreate', myshopifyDomain, data);
  // }
  // async onDraftOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderDelete) {
  //     this.logger.debug('onDraftOrderDelete', myshopifyDomain, data);
  // }
  // async onDraftOrderUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
  //     this.logger.debug('onDraftOrderUpdate', myshopifyDomain, data);
  // }

  protected async onOrderCancelled(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersCancelled,
  ) {
    this.logger.debug('onOrderCancelled', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug('onOrderCancelled result', result);
    } catch (error) {
      console.error('onOrderCancelled error', error);
    }
  }
  protected async onOrderCreate(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersCreate,
  ) {
    this.logger.debug('onOrderCreate', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug('onOrderCreate result', result);
    } catch (error) {
      console.error('onOrderCreate error', error);
    }
  }
  protected async onOrderFulfilled(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersFulfilled,
  ) {
    this.logger.debug('onOrderFulfilled', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug('onOrderFulfilled result', result);
    } catch (error) {
      console.error('onOrderFulfilled error', error);
    }
  }
  protected async onOrderPaid(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersPaid,
  ) {
    this.logger.debug('onOrderPaid', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug('onOrderPaid result', result);
    } catch (error) {
      console.error('onOrderPaid error', error);
    }
  }
  protected async onOrderPartiallyFulfilled(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled,
  ) {
    this.logger.debug('onOrderPartiallyFulfilled', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug(
        'onOrdonOrderPartiallyFulfillederUpdated result',
        result,
      );
    } catch (error) {
      console.error('onOrderPartiallyFulfilled error', error);
    }
  }
  protected async onOrderUpdated(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersUpdated,
  ) {
    this.logger.debug('onOrderUpdated', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug('onOrderUpdated result', result);
    } catch (error) {
      console.error('onOrderUpdated error', error);
    }
  }
  protected async onOrderDelete(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrdersCreate,
  ) {
    this.logger.debug('onOrderDelete', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateOrder(myshopifyDomain, data);
      this.logger.debug('onOrderDelete result', result);
    } catch (error) {
      console.error('onOrderDelete error', error);
    }
  }

  protected async onOrderTransactionCreate(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookOrderTransactionCreate,
  ) {
    this.logger.debug('onOrderTransactionCreate', myshopifyDomain, data);
    // try {
    //   const result = await this.updateOrCreateOrder(myshopifyDomain, data);
    //   this.logger.debug('onOrderDelete result', result);
    // } catch (error) {
    //   console.error('onOrderDelete error', error);
    // }
  }

  protected async onFulfillmentsCreate(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookFulfillmentCreate,
  ) {
    this.logger.debug('onFulfillmentsCreate', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateTracking(myshopifyDomain, data);
      this.logger.debug('onFulfillmentsCreate result', result);
    } catch (error) {
      console.error('onFulfillmentsCreate error', error);
    }
  }
  protected async onFulfillmentsUpdate(
    myshopifyDomain: string,
    data: Interfaces.WebhooksReponse.WebhookFulfillmentUpdate,
  ) {
    this.logger.debug('onFulfillmentsUpdate', myshopifyDomain, data);
    try {
      const result = await this.updateOrCreateTracking(myshopifyDomain, data);
      this.logger.debug('onFulfillmentsUpdate result', result);
    } catch (error) {
      console.error('onFulfillmentsUpdate error', error);
    }
  }

  protected async updateOrCreateTracking(
    myshopifyDomain,
    shopifyFulfillment: AnyWebhookFulfillment,
    overwrite: Partial<ParcellabTracking> = {},
  ) {
    const settings = await this.parcelLabSettings.findByShopDomain(
      myshopifyDomain,
    );
    if (!settings) {
      this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
      return ['Missing settings.'];
    }
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
    tracking = { ...tracking, ...overwrite, customFields };
    const result = await api.createOrUpdateTracking(tracking, this.testMode);
    return result;
  }

  protected async updateOrCreateOrder(
    myshopifyDomain,
    shopifyOrder: AnyWebhookOrder,
    overwrite: Partial<ParcellabOrder> = {},
  ) {
    const settings = await this.parcelLabSettings.findByShopDomain(
      myshopifyDomain,
    );
    if (!settings) {
      this.logger.debug('No parcelLab settings found for ' + myshopifyDomain);
      return;
    }
    const shopifyAuth = await this.getShopifyAuth(myshopifyDomain);
    const api = new ParcelLabApi(settings.user, settings.token);

    const transactions = await this.transaction.listFromShopify(
      shopifyAuth,
      shopifyOrder.id,
      {
        in_shop_currency: false,
        fields:
          'id,amount,authorization_expires_at,extended_authorization_attributes,receipt,created_at,currency,error_code,gateway,kind,processed_at,source_name,status,test,amount,message',
      },
    );

    this.logger.debug('transactions', transactions);

    let order = await this.transformOrder(settings, shopifyAuth, shopifyOrder);

    order = { ...order, ...overwrite };
    const orderResult = await api.createOrUpdateOrder(order, this.testMode);

    // If the order has fulfillments we can create tracking of them and not only a order
    const trackingResults: string[] = [];
    if (shopifyOrder.fulfillments && shopifyOrder.fulfillments.length > 0) {
      for (const shopifyFulfillment of shopifyOrder.fulfillments) {
        const tracking = await this.transformTracking(
          settings,
          shopifyAuth,
          shopifyFulfillment,
          order,
        );
        const trackingResult = await api.createOrUpdateTracking(
          tracking,
          this.testMode,
        );
        trackingResults.push(...trackingResult);
      }
    }

    return [...orderResult, ...trackingResults];
  }

  /**
   * Transform shopify fulfillment to a parcel lab compatible tracking object
   * @param shopifyAuth
   * @param shopifyFulfillment
   * @param order Currently only used in updateOrCreateOrder because we already have the order object there and do not need to fetch in again
   */
  protected async transformTracking(
    settings: Partial<ParcelLabSettings>,
    shopifyAuth: IShopifyConnect,
    shopifyFulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment,
    order?: ParcellabOrder,
  ): Promise<ParcellabTracking> {
    if (!order) {
      order =
        (await this.getOrderData(settings, shopifyAuth, shopifyFulfillment)) ||
        undefined;
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
      //   shopifyFulfillment.line_items,
      // ),
      branchDelivery: shopifyFulfillment.tracking_numbers?.length > 1, // TODO checkm,
      courier: (await this.getCourier(shopifyFulfillment)) || order.courier,
      client: (await this.getClient(shopifyAuth)) || order.client,
      cancelled: shopifyFulfillment.status === 'cancelled' || order.cancelled,
      complete:
        shopifyFulfillment.shipment_status === 'delivered' || order.complete,
      statuslink: shopifyFulfillment.tracking_urls
        ? shopifyFulfillment.tracking_urls.join(',')
        : shopifyFulfillment.tracking_url,
      tracking_number: shopifyFulfillment.tracking_numbers
        ? shopifyFulfillment.tracking_numbers.join(',')
        : shopifyFulfillment.tracking_number,
      warehouse: shopifyFulfillment.location_id
        ? shopifyFulfillment.location_id.toString()
        : undefined,
      customFields: {
        notify_customer: shopifyFulfillment.notify_customer,
        line_items: shopifyFulfillment.line_items,
      },
    };

    const customFields = {
      ...(tracking?.customFields || {}),
      ...(order?.customFields || {}),
      ...(settings?.customFields || {}),
    };

    tracking.customFields = customFields;

    if ((shopifyFulfillment as AnyWebhookFulfillment).destination) {
      shopifyFulfillment = shopifyFulfillment as AnyWebhookFulfillment;
      tracking.city = shopifyFulfillment.destination.city || order?.city;
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

      tracking.email = shopifyFulfillment?.email || order?.email;
    }

    return tracking as ParcellabTracking;
  }

  protected async transformOrder(
    settings: Partial<ParcelLabSettings>,
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
  ): Promise<ParcellabOrder> {
    const transactions = await this.transaction.listFromShopify(
      shopifyAuth,
      shopifyOrder.id,
      {
        in_shop_currency: false,
        fields:
          'id,amount,authorization_expires_at,extended_authorization_attributes,receipt,created_at,currency,error_code,gateway,kind,processed_at,source_name,status,test,amount,message',
      },
    );

    this.logger.debug('transactions', transactions);

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
        shopifyOrder.line_items,
        shopifyOrder.refunds,
      ),
      city: shopifyOrder?.shipping_address?.city,
      client: await this.getClient(shopifyAuth),
      orderNo: await this.getOrderNo(shopifyOrder),
      cancelled: shopifyOrder.cancelled_at !== null ? true : false,
      complete: shopifyOrder.fulfillment_status === 'fulfilled',
      customerNo: shopifyOrder.customer?.id.toString(),
      deliveryNo: await this.getDeliveryNo(shopifyOrder),
      destination_country_iso3: shopifyOrder.shipping_address?.country_code,
      email: shopifyOrder.customer?.email,
      language_iso3: await this.getLangCode(shopifyAuth, shopifyOrder),
      market: shopifyOrder.source_name,
      order_date: new Date(shopifyOrder.created_at),
      phone: shopifyOrder.customer?.phone,
      recipient: this.getName(shopifyOrder),
      recipient_notification: this.getName(shopifyOrder),
      statuslink: shopifyOrder.order_status_url,
      street: shopifyOrder.shipping_address?.address1,
      warehouse: shopifyOrder.location_id
        ? shopifyOrder.location_id.toString()
        : undefined,
      weight: shopifyOrder.total_weight.toString(),
      xid: shopifyOrder.id.toString(), // TODO CHECKME
      zip_code: shopifyOrder.shipping_address?.zip,
      customFields: {
        customer: {
          verified_email: shopifyOrder.customer.verified_email,
          accepts_marketing: shopifyOrder.customer.accepts_marketing,
        },

        line_items: shopifyOrder.line_items,
        refunds: shopifyOrder.refunds,
        shipping_lines: shopifyOrder.shipping_lines,

        // Used for notification template variables
        billing_address:
          shopifyOrder.billing_address || shopifyOrder.shipping_address,

        transactions,
      },
    };

    const customFields = {
      ...(order?.customFields || {}),
      ...(settings?.customFields || {}),
    };

    order.customFields = customFields;

    return order;
  }

  protected async transformLineItems(
    shopifyAuth: IShopifyConnect,
    lineItems:
      | Interfaces.DraftOrder['line_items']
      | Interfaces.Order['line_items'],
    refunds: Interfaces.Order['refunds'],
  ): Promise<ParcellabArticle[]> {
    const articles: ParcellabArticle[] = [];

    // Line items without refunds
    const filteredLineItems = await this.filterRefundLineItems(
      lineItems,
      refunds,
    );

    for (const lineItem of filteredLineItems) {
      const article: ParcellabArticle = {
        articleName: lineItem.title + ' ' + lineItem.variant_title,
        articleNo: lineItem.variant_id.toString(),
        quantity: lineItem.quantity,
      };
      const {
        articleNo,
        articleCategory,
        articleImageUrl,
        articleUrl,
      } = await this.getProductData(shopifyAuth, lineItem);

      article.articleNo = articleNo || article.articleNo;
      article.articleCategory = articleCategory;
      article.articleImageUrl = articleImageUrl;
      article.articleUrl = articleUrl;
      articles.push(article);
    }
    this.logger.debug('lineItems', lineItems);
    // this.logger.debug('refunds', refunds);
    this.logger.debug('filteredLineItems', filteredLineItems);
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
        filteredLineItems.push(lineItem);
      }
    }

    return filteredLineItems;
  }

  protected async getRefundLineItems(refunds: Interfaces.Order['refunds']) {
    const refundLineItems: Interfaces.RefundLineItem[] = [];
    for (const refund of refunds) {
      refundLineItems.push(...refund.refund_line_items);
    }
    return refundLineItems;
  }

  protected async getClient(shopifyAuth: IShopifyConnect) {
    return shopifyAuth.shop.name;
  }

  protected async getOrderNo(shopifyOrder: Partial<Interfaces.Order>) {
    let prefix = '';
    if (this.shopifyModuleOptions.app.environment !== 'production') {
      prefix = 'dev_';
    }
    return prefix + shopifyOrder.order_number.toString();
  }

  protected async getDeliveryNo(shopifyOrder: Partial<Interfaces.Order>) {
    let prefix = '';
    if (this.shopifyModuleOptions.app.environment !== 'production') {
      prefix = 'dev_';
    }
    return prefix + shopifyOrder.id.toString(); // TODO CHECKME
  }

  protected async getLangCode(
    shopifyAuth: IShopifyConnect,
    shopifyOrder: Partial<Interfaces.Order>,
  ) {
    let langCode = '';
    let langNote = '';

    // Parse locale from shopifyOrder.note_attributes
    if (Array.isArray(shopifyOrder.note_attributes)) {
      for (const noteAttributes of shopifyOrder.note_attributes) {
        if (
          noteAttributes.name === 'locale' &&
          typeof noteAttributes.value === 'string' &&
          noteAttributes.value.length >= 2 && // 'en'
          noteAttributes.value.length <= 5 // 'en-EN'
        ) {
          langNote = noteAttributes.value;
        }
      }
    }

    langCode =
      shopifyOrder.customer_locale ||
      langNote ||
      shopifyOrder.billing_address?.country_code ||
      shopifyOrder.shipping_address?.country_code ||
      shopifyOrder.customer?.default_address?.country_code ||
      shopifyAuth.shop.primary_locale;

    return langCode;
  }

  protected getName(shopifyOrder: Partial<Interfaces.Order>) {
    return (
      shopifyOrder.customer?.name ||
      shopifyOrder.customer?.first_name + ' ' + shopifyOrder.customer?.last_name
    );
  }

  protected async getShopifyAuth(domain: string) {
    return this.shopify.findByDomain(domain);
  }

  protected async getProductData(
    shopifyAuth: IShopifyConnect,
    lineItem: Interfaces.LineItem,
  ): Promise<{
    articleNo?: string;
    articleCategory?: string;
    articleImageUrl?: string;
    articleUrl?: string;
  }> {
    try {
      const product = await this.product.getFromShopify(
        shopifyAuth,
        lineItem.product_id,
      );
      const variant = await this.getVariant(product, lineItem.variant_id);
      return {
        articleNo: variant.barcode || lineItem.variant_id.toString(), // TODO make configurable what the articleNo should be
        articleCategory: undefined, // TODO how can we get the collections of a product?
        articleImageUrl: this.getProductImageSource(
          product,
          lineItem.variant_id,
        ),
        articleUrl: shopifyAuth.shop.domain + '/products/' + product.handle,
      };
    } catch (error) {
      console.error('getProductData', error);
      return {
        articleNo: lineItem.variant_id.toString(),
        articleCategory: undefined,
        articleImageUrl: undefined,
        articleUrl: undefined,
      };
    }
  }

  protected async getOrderData(
    settings: Partial<ParcelLabSettings>,
    shopifyAuth: IShopifyConnect,
    fulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment,
  ): Promise<ParcellabOrder | null> {
    if (!fulfillment.order_id) {
      console.warn('getOrderData no order_id given!');
      return null;
    }
    try {
      const order = await this.order.getFromShopify(
        shopifyAuth,
        fulfillment.order_id,
        { status: 'any' } as any,
      ); // By default archived orders are not found by the api

      return this.transformOrder(settings, shopifyAuth, order);
    } catch (error) {
      console.error(
        `Error on getOrderData with order_id ${fulfillment.order_id} for shop ${shopifyAuth.myshopify_domain}`,
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

  protected async getCourier(
    fulfillment: AnyWebhookFulfillment | Interfaces.Fulfillment,
  ) {
    return fulfillment.tracking_company;
  }
}
