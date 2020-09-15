import Debug from 'debug';
import io from 'socket.io-client';
import { EventEmitter } from 'events';

export class WebhooksService extends EventEmitter {
  public static instance?: WebhooksService;

  protected socket?: SocketIOClient.Socket;
  protected debug = Debug('services:WebhooksService');

  constructor() {
    super();
    this.debug('constructor');
    // this.on = this.socket.on;
    // this.once = this.socket.once;
    if (WebhooksService.instance) {
      return WebhooksService.instance;
    }
    this.init();
    WebhooksService.instance = this;
  }

  public async init() {
    this.debug('init');
    this.socket = io(
      'https://next.artandcode.studio/socket.io/shopify/api/webhooks',
      { secure: true, transports: ['polling'] },
    );
    this.socket.on('connect', () => {
      this.debug('connect');
      this.emit('connect');
    });

    this.socket.on('exception', (data: any) => {
      console.error('exception', data);
      this.emit('exception', data);
    });

    this.socket.on('disconnect', () => {
      this.debug('disconnect');
      this.emit('disconnect');
    });

    this.socket.on('carts/create', (data: any) => {
      this.debug('carts/create', data);
      this.emit('carts/create', data);
    });

    this.socket.on('carts/update', (data: any) => {
      this.debug('carts/update', data);
      this.emit('carts/update', data);
    });

    this.socket.on('checkouts/create', (data: any) => {
      this.debug('checkouts/create', data);
      this.emit('checkouts/create', data);
    });

    this.socket.on('checkouts/update', (data: any) => {
      this.debug('checkouts/update', data);
      this.emit('checkouts/update', data);
    });

    this.socket.on('checkouts/delete', (data: any) => {
      this.debug('checkouts/delete', data);
      this.emit('checkouts/delete', data);
    });

    this.socket.on('collections/create', (data: any) => {
      this.debug('collections/create', data);
      this.emit('collections/create', data);
    });

    this.socket.on('collections/update', (data: any) => {
      this.debug('collections/update', data);
      this.emit('collections/update', data);
    });

    this.socket.on('collections/delete', (data: any) => {
      this.debug('collections/delete', data);
      this.emit('collections/delete', data);
    });

    this.socket.on('collection_listings/add', (data: any) => {
      this.debug('collection_listings/add', data);
      this.emit('collection_listings/add', data);
    });

    this.socket.on('collection_listings/remove', (data: any) => {
      this.debug('collection_listings/remove', data);
      this.emit('collection_listings/remove', data);
    });

    this.socket.on('collection_listings/update', (data: any) => {
      this.debug('collection_listings/update', data);
      this.emit('collection_listings/update', data);
    });

    this.socket.on('customers/create', (data: any) => {
      this.debug('customers/create', data);
      this.emit('customers/create', data);
    });

    this.socket.on('customers/disable', (data: any) => {
      this.debug('customers/disable', data);
      this.emit('customers/disable', data);
    });

    this.socket.on('customers/enable', (data: any) => {
      this.debug('customers/enable', data);
      this.emit('customers/enable', data);
    });

    this.socket.on('customers/update', (data: any) => {
      this.debug('customers/update', data);
      this.emit('customers/update', data);
    });

    this.socket.on('customers/delete', (data: any) => {
      this.debug('customers/delete', data);
      this.emit('customers/delete', data);
    });

    this.socket.on('customer_groups/create', (data: any) => {
      this.debug('customer_groups/create', data);
      this.emit('customer_groups/create', data);
    });

    this.socket.on('customer_groups/update', (data: any) => {
      this.debug('customer_groups/update', data);
      this.emit('customer_groups/update', data);
    });

    this.socket.on('customer_groups/delete', (data: any) => {
      this.debug('customer_groups/delete', data);
      this.emit('customer_groups/delete', data);
    });

    this.socket.on('draft_orders/create', (data: any) => {
      this.debug('draft_orders/create', data);
      this.emit('draft_orders/create', data);
    });

    this.socket.on('draft_orders/update', (data: any) => {
      this.debug('draft_orders/update', data);
      this.emit('draft_orders/update', data);
    });

    this.socket.on('fulfillments/create', (data: any) => {
      this.debug('fulfillments/create', data);
      this.emit('fulfillments/create', data);
    });

    this.socket.on('fulfillments/update', (data: any) => {
      this.debug('fulfillments/update', data);
      this.emit('fulfillments/update', data);
    });

    this.socket.on('fulfillment_events/create', (data: any) => {
      this.debug('fulfillment_events/create', data);
      this.emit('fulfillment_events/create', data);
    });

    this.socket.on('fulfillment_events/delete', (data: any) => {
      this.debug('fulfillment_events/delete', data);
      this.emit('fulfillment_events/delete', data);
    });

    this.socket.on('inventory_items/create', (data: any) => {
      this.debug('inventory_items/create', data);
      this.emit('inventory_items/create', data);
    });

    this.socket.on('inventory_items/update', (data: any) => {
      this.debug('inventory_items/update', data);
      this.emit('inventory_items/update', data);
    });

    this.socket.on('inventory_items/delete', (data: any) => {
      this.debug('inventory_items/delete', data);
      this.emit('inventory_items/delete', data);
    });

    this.socket.on('inventory_levels/connect', (data: any) => {
      this.debug('inventory_levels/connect', data);
      this.emit('inventory_levels/connect', data);
    });

    this.socket.on('inventory_levels/update', (data: any) => {
      this.debug('inventory_levels/update', data);
      this.emit('inventory_levels/update', data);
    });

    this.socket.on('inventory_levels/disconnect', (data: any) => {
      this.debug('inventory_levels/disconnect', data);
      this.emit('inventory_levels/disconnect', data);
    });

    this.socket.on('locations/create', (data: any) => {
      this.debug('locations/create', data);
      this.emit('locations/create', data);
    });

    this.socket.on('locations/update', (data: any) => {
      this.debug('locations/update', data);
      this.emit('locations/update', data);
    });

    this.socket.on('locations/delete', (data: any) => {
      this.debug('locations/delete', data);
      this.emit('locations/delete', data);
    });

    this.socket.on('orders/cancelled', (data: any) => {
      this.debug('orders/cancelled', data);
      this.emit('orders/cancelled', data);
    });

    this.socket.on('orders/create', (data: any) => {
      this.debug('orders/create', data);
      this.emit('orders/create', data);
    });

    this.socket.on('orders/fulfilled', (data: any) => {
      this.debug('orders/fulfilled', data);
      this.emit('orders/fulfilled', data);
    });

    this.socket.on('orders/paid', (data: any) => {
      this.debug('orders/paid', data);
      this.emit('orders/paid', data);
    });

    this.socket.on('orders/partially_fulfilled', (data: any) => {
      this.debug('orders/partially_fulfilled', data);
      this.emit('orders/partially_fulfilled', data);
    });

    this.socket.on('orders/updated', (data: any) => {
      this.debug('orders/updated', data);
      this.emit('orders/updated', data);
    });

    this.socket.on('orders/delete', (data: any) => {
      this.debug('orders/delete', data);
      this.emit('orders/delete', data);
    });

    this.socket.on('order_transactions/create', (data: any) => {
      this.debug('order_transactions/create', data);
      this.emit('order_transactions/create', data);
    });

    this.socket.on('products/create', (data: any) => {
      this.debug('products/create', data);
      this.emit('products/create', data);
    });

    this.socket.on('products/update', (data: any) => {
      this.debug('products/update', data);
      this.emit('products/update', data);
    });

    this.socket.on('products/delete', (data: any) => {
      this.debug('products/delete', data);
      this.emit('products/delete', data);
    });

    this.socket.on('product_listings/add', (data: any) => {
      this.debug('product_listings/add', data);
      this.emit('product_listings/add', data);
    });

    this.socket.on('product_listings/remove', (data: any) => {
      this.debug('product_listings/remove', data);
      this.emit('product_listings/remove', data);
    });

    this.socket.on('product_listings/update', (data: any) => {
      this.debug('product_listings/update', data);
      this.emit('product_listings/update', data);
    });

    this.socket.on('refunds/create', (data: any) => {
      this.debug('refunds/create', data);
      this.emit('refunds/create', data);
    });

    this.socket.on('app/uninstalled', (data: any) => {
      this.debug('app/uninstalled', data);
      this.emit('app/uninstalled', data);
    });

    this.socket.on('shop/update', (data: any) => {
      this.debug('shop/update', data);
      this.emit('shop/update', data);
    });

    this.socket.on('themes/create', (data: any) => {
      this.debug('themes/create', data);
      this.emit('themes/create', data);
    });

    this.socket.on('themes/publish', (data: any) => {
      this.debug('themes/publish', data);
      this.emit('themes/publish', data);
    });

    this.socket.on('themes/update', (data: any) => {
      this.debug('themes/update', data);
      this.emit('themes/update', data);
    });

    this.socket.on('themes/delete', (data: any) => {
      this.debug('themes/delete', data);
      this.emit('themes/delete', data);
    });
  }
}
