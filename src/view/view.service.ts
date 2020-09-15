import { Injectable } from '@nestjs/common';
// import config from '../config.js';
import merge = require('deepmerge');
import { ShopifyAuthService, ConfigApp } from 'nest-shopify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ViewService {

  constructor(private configService: ConfigService, private readonly shopifyAuthService: ShopifyAuthService) {}

  async getGlobalViewVars(shop: string, method) {
    return {
      app: this.configService.get<ConfigApp>('app'),
      shopify: {
        shop,
        apiKey: this.configService.get<string>('shopify.clientID'),
        redirectUri: this.configService.get<string>('shopify.callbackURL'),
        // authUri: this.shopifyAuthService.getAuthUrl(request, shop, ConfigService.shopify.callbackURL),
      },
      dataset: {
        debug: this.configService.get<boolean>('app.debug'),
        environment: this.configService.get<string>('app.environment'),
        namespace: method.name, // method name
        title: '',
      },
      page: {
        title: '',
      },
    };
  }

  async terms(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.terms);
    const title = 'Terms and conditions';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async install(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.install);
    const title = 'ParcelLab App for Shopify';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async privacy(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.privacy);
    const title = 'Privacy policy';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async app(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.app);
    const title = 'Overview';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async settings(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.settings);
    const title = 'Settings';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async plan(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.plan);
    const title = 'Plan';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async api(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.api);
    const title = 'API';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async apiShopify(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.apiShopify);
    const title = 'Shopify API';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

  async apiWebhooks(shop: string) {
    const vars = await this.getGlobalViewVars(shop, this.apiWebhooks);
    const title = 'Webhooks API';
    return merge(vars, {
      dataset: {
        title,
      },
      page: {
        title,
      },
    });
  }

}
