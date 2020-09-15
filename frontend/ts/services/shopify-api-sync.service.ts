import { HttpService } from '@ribajs/core';
import Debug from 'debug';
import { ISyncOptions, ISyncProgress } from '../interfaces/shopify-sync';
import io from 'socket.io-client';
import { EventEmitter } from 'events';

// TODO singleton?
export class ShopifyApiSyncService extends EventEmitter {
  public static instance?: ShopifyApiSyncService;

  protected debug = Debug('services:ShopifyApiSyncService');
  protected baseUrl = `/shopify/sync`;
  protected socket?: SocketIOClient.Socket;

  constructor() {
    super();
    if (ShopifyApiSyncService.instance) {
      return ShopifyApiSyncService.instance;
    }
    this.debug('constructor');
    this.socket = io('https://next.artandcode.studio/socket.io/shopify/sync', {
      secure: true,
      transports: ['polling'],
    });
    this.socket.on('connect', () => {
      this.debug('connect');
      this.emit('connect');
    });

    this.socket.on('exception', (data: any) => {
      console.error('exception', data);
      this.emit('exception', data);
    });

    this.socket.on('sync-exception', (data: any) => {
      console.error('sync-exception', data);
      this.emit('sync-exception', data);
    });

    this.socket.on('sync', (progress: ISyncProgress) => {
      this.debug('sync', progress);
      this.emit('sync', progress);
    });

    this.socket.on(`sync-ended`, (progress: ISyncProgress) => {
      this.debug('sync-ended', progress);
      this.emit('sync-ended', progress);
    });

    this.socket.on(`sync-success`, (progress: ISyncProgress) => {
      this.debug('sync-success', progress);
      this.emit('sync-success', progress);
    });

    this.socket.on(`sync-failed`, (progress: ISyncProgress) => {
      this.debug('sync-failed', progress);
      this.emit('sync-failed', progress);
    });

    this.socket.on(`sync-cancelled`, (progress: ISyncProgress) => {
      this.debug('sync-cancelled', progress);
      this.emit('sync-cancelled', progress);
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
