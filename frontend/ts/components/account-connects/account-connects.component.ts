import { Component } from '@ribajs/core';
import { JQuery } from '@ribajs/jquery';
import Debug from 'debug';
import { hasChildNodesTrim } from '@ribajs/utils/src/dom';

import pugTemplate from './account-connects.component.pug';

import type { IShopifyConnect } from '../../interfaces/shopify-connect/connect';
import { AuthService } from '../../services/auth.service';

import { EASDKWrapperService } from '@ribajs/shopify-easdk';

interface IScope {
  myshopify_domain?: string;
  type?: 'shopify' | 'facebook' | 'vimeo';
  avatarUrl?: string;
  isConnected: boolean;
  account?: IShopifyConnect;
  locales: any;
  connect: AccountConnectsComponent['connect'];
  disconnect: AccountConnectsComponent['disconnect'];
  logout: AccountConnectsComponent['logout'];
  inIframe: boolean;
}

export class AccountConnectsComponent extends Component {
  public static tagName = 'rv-account-connects';

  static get observedAttributes() {
    return ['type'];
  }

  protected $el: JQuery<AccountConnectsComponent>;
  protected debug = Debug('component:' + AccountConnectsComponent.tagName);
  protected authService = new AuthService();

  protected scope: IScope = {
    myshopify_domain: window.shop || undefined,
    account: undefined,
    isConnected: false,
    type: undefined,
    avatarUrl: undefined,
    locales: {
      title: 'components.accountConnects.{type}.title',
      info: 'components.accountConnects.{type}.info',
      notConnected: 'components.accountConnects.{type}.notConnected',
    },
    connect: this.connect,
    disconnect: this.disconnect,
    logout: this.logout,
    inIframe: EASDKWrapperService.inIframe(),
  };

  constructor() {
    super();
    this.$el = JQuery(this);
    this.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(AccountConnectsComponent.observedAttributes);
  }

  public connect() {
    this.debug('connect');
    if (!this.scope.type) {
      throw new Error('Type attribute is required on this component');
    }
    return this.authService.connect(
      this.scope.type,
      this.scope.myshopify_domain,
    );
  }

  public disconnect() {
    if (!this.scope.type) {
      throw new Error('Type attribute is required on this component');
    }
    if (!this.scope.account) {
      throw new Error("You can't disconnect an account that does not exist");
    }
    this.authService
      .disconnect(this.scope.type, this.scope.account)
      .then((result) => {
        if (result.success) {
          this.scope.isConnected = false;
          this.scope.account = undefined;
          this.scope.avatarUrl = undefined;
        }
      });
  }

  /**
   * Logout from app
   */
  public logout() {
    this.debug('logout');
    return this.authService.logout();
  }

  protected async getAvatarUrl() {
    if (this.scope.type === 'shopify') {
      return '/images/shopify.svg';
    }
  }

  protected async accountIsConnected(): Promise<IShopifyConnect | null> {
    if (!this.scope.type) {
      throw new Error('Type attribute is required on this component');
    }
    return this.authService.connected(this.scope.type);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug('beforeBind');

    this.scope.locales.title = this.scope.locales.title.replace(
      '{type}',
      this.scope.type,
    );
    this.scope.locales.info = this.scope.locales.info.replace(
      '{type}',
      this.scope.type,
    );
    this.scope.locales.notConnected = this.scope.locales.notConnected.replace(
      '{type}',
      this.scope.type,
    );

    return this.accountIsConnected()
      .then((account: IShopifyConnect | null) => {
        if (account) {
          this.scope.isConnected = true;
          this.scope.account = account;
        }
        this.debug('account', account);
        return account;
      })
      .then(async () => {
        if (this.scope.isConnected) {
          return this.getAvatarUrl();
        }
        return null;
      })
      .then(async (avatar) => {
        this.scope.avatarUrl = avatar ? avatar : undefined;
        return this.scope.avatarUrl;
      })
      .catch((error: any) => {
        console.error(error.responseJSON ? error.responseJSON : error);
        /**
         * If Access token has expired
         * @see https://developers.facebook.com/docs/graph-api/using-graph-api/error-handling/
         */
        if (
          this.scope.type === 'facebook' &&
          error.responseJSON &&
          error.responseJSON.code === 190
        ) {
          // TODO this.scope.needReconnect and delete account on server
          this.scope.isConnected = false;
          this.scope.account = undefined;
        }
      });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    await super.afterBind();
  }

  protected requiredAttributes() {
    return ['type'];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
