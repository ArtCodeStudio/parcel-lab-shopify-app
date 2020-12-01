import { HttpService, EventDispatcher } from '@ribajs/core';
import Debug from 'debug';
import { ISyncOptions, ISyncProgress } from '../interfaces/shopify-sync';
import io from 'socket.io-client';

// TODO singleton?
export class ShopifyApiSyncService extends EventDispatcher {
  public static instance?: ShopifyApiSyncService;

  protected debug = Debug('services:ShopifyApiSyncService');
  protected baseUrl = `/shopify/sync`;
  protected socket?: SocketIOClient.Socket;
  protected host: string;

  constructor(host: string) {
    super('shopify-api-sync-service');
    this.host = host;
    if (ShopifyApiSyncService.instance) {
      return ShopifyApiSyncService.instance;
    }
    this.debug('constructor');
    this.socket = io(`/socket.io/shopify/sync`, {
      secure: true,
      transports: ['polling'],
    });
    this.socket.on('connect', () => {
      this.debug('connect');
      this.trigger('connect');
    });

    this.socket.on('exception', (data: any) => {
      console.error('exception', data);
      this.trigger('exception', data);
    });

    this.socket.on('sync-exception', (data: any) => {
      console.error('sync-exception', data);
      this.trigger('sync-exception', data);
    });

    this.socket.on('sync', (progress: ISyncProgress) => {
      this.debug('sync', progress);
      this.trigger('sync', progress);
    });

    this.socket.on(`sync-ended`, (progress: ISyncProgress) => {
      this.debug('sync-ended', progress);
      this.trigger('sync-ended', progress);
    });

    this.socket.on(`sync-success`, (progress: ISyncProgress) => {
      this.debug('sync-success', progress);
      this.trigger('sync-success', progress);
    });

    this.socket.on(`sync-failed`, (progress: ISyncProgress) => {
      this.debug('sync-failed', progress);
      this.trigger('sync-failed', progress);
    });

    this.socket.on(`sync-cancelled`, (progress: ISyncProgress) => {
      this.debug('sync-cancelled', progress);
      this.trigger('sync-cancelled', progress);
    });

    ShopifyApiSyncService.instance = this;
  }

  public async start(options: Partial<ISyncOptions>) {
    options.syncToDb = !!options.syncToDb;
    options.syncToSwiftype = !!options.syncToSwiftype;
    options.includeTransactions = !!options.includeTransactions;
    options.includeOrders = !!options.includeOrders;
    options.includeTransactions = !!options.includeTransactions;
    options.includeProducts = !!options.includeProducts;
    options.includePages = !!options.includePages;
    options.includeSmartCollections = !!options.includeSmartCollections;
    options.includeCustomCollections = !!options.includeCustomCollections;
    options.resync = !!options.resync;
    options.cancelExisting = !!options.cancelExisting;
    this.debug('start', options);
    return HttpService.post(this.baseUrl, options, 'json').then(
      (progress: ISyncProgress) => {
        this.debug('start progress', progress);
        return progress;
      },
    );
  }

  public async cancel() {
    return HttpService.delete(this.baseUrl, null, 'json').then(
      (result: any) => {
        this.debug('cancel result', result);
        return result;
      },
    );
  }

  public async get() {
    return HttpService.getJSON(this.baseUrl + '/latest').then(
      (progress: ISyncProgress) => {
        this.debug('Last progress', progress);
        return progress;
      },
    );
  }

  public async list() {
    return HttpService.getJSON(this.baseUrl).then(
      (progress: ISyncProgress[]) => {
        this.debug('list progress', progress);
        return progress;
      },
    );
  }
}
