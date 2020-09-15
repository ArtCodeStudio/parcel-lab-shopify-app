import { Get, Controller, Render, Req } from '@nestjs/common';
import { ViewService } from './view.service';

type Request = any;

@Controller('')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  private extractShopDomain(request: Request) {
    let shop: string;
    if (request.query && request.query.shop) {
      shop = request.query.shop;
    }
    if (request.user && request.user.shop && request.user.shop.myshopify_domain) {
      shop = request.user.shop.myshopify_domain;
    }
    return shop;
  }

  /**
   * Shows the app install input
   */
  @Get()
  @Render('install')
  install(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.install(shop);
  }

  /**
   * Shows the app terms
   */
  @Get('/terms')
  @Render('terms')
  terms(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.terms(shop);
  }

  /**
   * Shows the app privacy
   */
  @Get('/privacy')
  @Render('privacy')
  privacy(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.privacy(shop);
  }

  /**
   * App backend
   */
  @Get('/view')
  @Render('pages/app')
  app(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.app(shop);
  }

  /**
   * App backend / settings
   */
  @Get('/view/settings')
  @Render('pages/settings')
  settings(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.settings(shop);
  }

  /**
   * App plan
   * If no plan was choosen the app should always redirect to this page
   */
  @Get('/view/plan')
  @Render('pages/plan')
  plan(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.plan(shop);
  }

  /**
   * App backend / api
   */
  @Get('/view/api')
  @Render('pages/api')
  api(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.api(shop);
  }

  /**
   * App backend / api / shopify
   */
  @Get('/view/api/shopify')
  @Render('pages/api/shopify')
  apiShopify(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.apiShopify(shop);
  }

  /**
   * App backend / api / webhooks
   */
  @Get('/view/api/webhooks')
  @Render('pages/api/webhooks')
  apiwebhooks(@Req() req) {
    const shop = this.extractShopDomain(req);
    return this.viewService.apiWebhooks(shop);
  }

  /**
   * close the current window
   */
  @Get('/view/close')
  @Render('pages/close')
  close(@Req() req) {
    return {};
  }
}