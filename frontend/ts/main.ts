import { Riba, HttpService, coreModule, EventDispatcher } from '@ribajs/core';
import { ready } from "@ribajs/utils/src/dom";
import Debug from 'debug';

// Extensions / Modules
import { JQuery } from '@ribajs/jquery';
import { routerModule } from '@ribajs/router';
import { i18nModule, LocalesStaticService } from '@ribajs/i18n';
import { bs4Module } from '@ribajs/bs4';
import {
  ShopifyApp,
  shopifyEasdkModule,
  EASDKWrapperService,
} from '@ribajs/shopify-easdk';

// Own
import * as CustomComponents from './components';
import * as customBinders from './binders/index';
import locales from './locales';

import { AuthService } from './services/auth.service';

declare global {
  interface Window {
    host: string;
    shop: string;
    apiKey: string;
    ENVIRONMENT: string;
    /** redirect uri to use if not iframe */
    redirectUri: string;
  }
}

const handleize = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/gi, '')
    .replace(/ /g, '-');
};

export class Main {
  protected debug = Debug('app:main');
  protected riba = new Riba();
  protected model: any = {};
  protected dispatcher = new EventDispatcher();

  protected authService = new AuthService();
  protected shopifyApp = new EASDKWrapperService(ShopifyApp);
  protected localesService = new LocalesStaticService(
    locales,
    undefined,
    false,
  );

  constructor() {
    this.debug('init the main application');

    this.shopifyApp.Bar.initialize({
      title: 'The Developer App',
    });

    this.shopifyApp.Bar.autoIcon();
    this.shopifyApp.Bar.autoLoading();
    this.shopifyApp.Bar.autoTitle((title) => {
      return this.localesService.getByCurrentLang(['titles', handleize(title)]);
    });

    this.authService
      .loggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          this.debug('ok');
        } else {
          // not logged in
          console.warn('Not logged in', loggedIn);
          if (EASDKWrapperService.inIframe()) {
            return this.authService
              .shopifyConnectIframe(window.shop)
              .then((result) => {
                console.warn('Redirect to auth url', result);
                return this.shopifyApp.redirect(result.authUrl);
              })
              .catch((error) => {
                console.error(error);
                return error;
              });
          }

          if (window.shop && window.shop.length) {
            window.location.href = '/shopify/auth?shop=' + window.shop;
          } else {
            window.location.href = '/'; // login / install input
          }
        }
      })
      .catch((e) => {
        console.error(e);
      });

    // Regist custom components
    this.riba.module.regist({
      components: CustomComponents,
      binders: { ...customBinders },
    });

    // Regist modules
    console.debug('regist coreModule');
    this.riba.module.regist(coreModule);
    console.debug('regist routerModule', routerModule);
    this.riba.module.regist(routerModule);
    console.debug('regist i18nModule');
    this.riba.module.regist(i18nModule(this.localesService));
    console.debug('regist shopifyEasdkModule');
    this.riba.module.regist(shopifyEasdkModule);
    console.debug('regist bs4Module');
    this.riba.module.regist(bs4Module);

    // this.dispatcher.on('newPageReady', (viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) => {
    //   this.debug('newPageReady', viewId, currentStatus, dataset);
    // });

    ready(() => {
      this.riba.bind(document.body, this.model);
    });
    
  }
}

const bootstrap = () => {
  if (window.shop) {
    // set shop in header for all javascript requests
    HttpService.setRequestHeaderEachRequest('shop', window.shop);

    ShopifyApp.init({
      apiKey: window.apiKey,
      shopOrigin: `https://${window.shop}`,
      forceRedirect: true, // If we want to allow to use the app outsite of the iframe we need to set false here
      debug: true,
    });
  } else {
    console.error('Shop not detected', window.shop);
    window.location.href = '/';
  }

  ShopifyApp.ready(() => {
    new Main();
  });
};

ready(() => {
  bootstrap();
});

