import { Component } from '@ribajs/core';

import { JQuery } from '@ribajs/jquery';
import Debug from 'debug';

import pugTemplate from './sync-progress.component.pug';

import { ShopifyApiSyncService } from '../../services/shopify-api-sync.service';
import type {
  ISyncProgress,
  ISyncOptions,
} from '../../interfaces/shopify-sync';

interface IScope {
  start: SyncProgressComponent['start'];
  cancel: SyncProgressComponent['cancel'];
  restart: SyncProgressComponent['restart'];
  progress: ISyncProgress | null;
}

export class SyncProgressComponent extends Component {
  public static tagName = 'rv-sync-progress';

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;
  protected debug = Debug('component:' + SyncProgressComponent.tagName);
  protected syncService = new ShopifyApiSyncService();

  protected options: Partial<ISyncOptions> = {
    syncToDb: true,
    syncToSwiftype: true,
    syncToEs: false,
    includeOrders: false,
    includeTransactions: false,
    includeProducts: true,
    includePages: true,
    includeSmartCollections: true,
    includeCustomCollections: true,
  };

  protected scope: IScope = {
    start: this.start,
    cancel: this.cancel,
    restart: this.restart,
    progress: null,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = JQuery(this.el);
    this.debug('constructor', this);
    this.init(SyncProgressComponent.observedAttributes);
  }

  public start() {
    const options: ISyncOptions = {
      syncToDb: this.options.syncToDb === true,
      syncToSwiftype: this.options.syncToSwiftype === true,
      syncToEs: this.options.syncToEs === true,
      includeOrders: this.options.includeOrders === true,
      includeTransactions: this.options.includeTransactions === true,
      includeProducts: this.options.includeProducts === true,
      includePages: this.options.includePages === true,
      includeSmartCollections: this.options.includeSmartCollections === true,
      includeCustomCollections: this.options.includeCustomCollections === true,
      resync: true,
      cancelExisting: false,
    };

    if (this.scope.progress) {
      this.scope.progress.state = 'starting';
    } else {
      // Create new fake progress
      this.scope.progress = {
        shop: (window as any).shop,
        state: 'starting',
        options,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastError: null,
      };
    }

    this.debug('start', options);
    this.scope.progress.state = 'starting';
    this.syncService
      .start(options)
      .then((progress) => {
        this.debug('start progress', progress);
        this.scope.progress = progress;
      })
      .catch((error) => {
        error = error.responseJSON ? error.responseJSON : error;
        console.error('error on start', error);
        if (this.scope.progress) {
          this.scope.progress.state = 'failed';
          if (error.message) {
            this.scope.progress.lastError = error.message;
          }
        }
      });
  }

  public restart() {
    const options: ISyncOptions = {
      syncToDb: this.options.syncToDb === true,
      syncToEs: this.options.syncToEs === true,
      syncToSwiftype: this.options.syncToSwiftype === true,
      includeOrders: this.options.includeOrders === true,
      includeTransactions: this.options.includeTransactions === true,
      includeProducts: this.options.includeProducts === true,
      includePages: this.options.includePages === true,
      includeSmartCollections: this.options.includeSmartCollections === true,
      includeCustomCollections: this.options.includeCustomCollections === true,
      resync: true,
      cancelExisting: true,
    };
    this.debug('restart', options);

    if (this.scope.progress) {
      this.scope.progress.state = 'starting';
    }

    this.syncService
      .start(options)
      .then((progress) => {
        this.debug('restart progress', progress);
        this.scope.progress = progress;
      })
      .catch((error) => {
        error = error.responseJSON ? error.responseJSON : error;
        console.error('error on restart', error);
        if (this.scope.progress) {
          this.scope.progress.state = 'failed';
          if (error.message) {
            this.scope.progress.lastError = error.message;
          }
        }
      });
  }

  public cancel() {
    this.debug('cancel');
    if (this.scope.progress) {
      this.scope.progress.state = 'ending';
    }

    this.syncService
      .cancel()
      .then((progress) => {
        this.debug('cancel', progress);
        this.scope.progress = progress;
      })
      .catch((error) => {
        error = error.responseJSON ? error.responseJSON : error;
        console.error('error on cancel', error);
        if (this.scope.progress) {
          this.scope.progress.state = 'failed';
          if (error.message) {
            this.scope.progress.lastError = error.message;
          }
        }
      });
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    return this.syncService
      .get()
      .then((progress) => {
        this.debug('last progress', progress);
        this.scope.progress = progress;
      })
      .then((/*prog*/) => {
        this.syncService.on('exception', (error: any) => {
          console.error('socket.io exception', error);
        });

        this.syncService.on('sync-exception', (error: any) => {
          console.error('sync-exception', error);
          if (this.scope.progress) {
            this.scope.progress.state = 'failed';
            if (error.message) {
              this.scope.progress.lastError = error.message;
            }
          }
        });

        this.syncService.on('sync', (progress: ISyncProgress) => {
          this.debug('sync', progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-ended`, (progress: ISyncProgress) => {
          this.debug('sync-ended', progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-success`, (progress: ISyncProgress) => {
          this.debug('sync-success', progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-failed`, (progress: ISyncProgress) => {
          this.debug('sync-failed', progress);
          this.scope.progress = progress;
        });

        this.syncService.on(`sync-cancelled`, (progress: ISyncProgress) => {
          this.debug('sync-cancelled', progress);
          this.scope.progress = progress;
        });
      });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
