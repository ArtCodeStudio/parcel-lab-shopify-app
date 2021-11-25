import { Riba, View, coreModule } from '@ribajs/core';
import { ready } from '@ribajs/utils/src/dom';
import { bs4Module } from '@ribajs/bs4';
import { i18nModule, LocalesStaticService } from '@ribajs/i18n';
import { ShopifyNestShopInputComponent } from '@ribajs/shopify-nest';
import { routerModule } from '@ribajs/router';
import locales from './locales';
import Debug from 'debug';

export class InfoApp {
  protected view?: View;
  protected debug = Debug('app:info');
  protected riba = new Riba();
  protected model: any = {};

  protected localesService = new LocalesStaticService(
    locales,
    undefined,
    false,
  );

  constructor() {
    this.debug('init the info application');

    // Regist custom components
    this.riba.module.component.regists({ ShopifyNestShopInputComponent });

    // Regist modules
    this.riba.module.regist(coreModule.init());
    this.riba.module.regist(routerModule.init());
    this.riba.module.regist(bs4Module.init());
    this.riba.module.regist(
      i18nModule.init({ localesService: this.localesService }),
    );

    this.view = this.riba.bind(document.body, this.model);
  }
}

const bootstrap = () => {
  new InfoApp();
};

ready(() => {
  bootstrap();
});
