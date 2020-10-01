import { Get, Controller, Render, Req } from '@nestjs/common';
import { ViewService } from './view.service';

type Request = any;

@Controller('')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  private extractShopDomain(req: Request) {
    let shop: string;
    if (req.query && req.query.shop) {
      shop = req.query.shop;
    }
    if (req.shop) {
      shop = req.shop;
    }

    if (req.user && req.user.shop && req.user.shop.myshopify_domain) {
      shop = req.user.shop.myshopify_domain;
    }

    if (req.session.currentShop) {
      shop = req.shop;
    }

    if (req.headers['X-Shopify-Shop-Domain']) {
      shop = req.headers['X-Shopify-Shop-Domain'];
    }

    return shop;
  }

  /**
   * Shows the app install input
   */
  @Get()
  @Render('install')
  install(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.install(shop);
  }

  /**
   * Shows the app terms
   */
  @Get('/terms')
  @Render('terms')
  terms(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.terms(shop);
  }

  /**
   * Shows the app privacy
   */
  @Get('/privacy')
  @Render('privacy')
  privacy(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.privacy(shop);
  }

  /**
   * App backend
   */
  @Get('/view')
  @Render('pages/app')
  app(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.app(shop);
  }

  /**
   * App backend / settings
   */
  @Get('/view/settings')
  @Render('pages/settings')
  settings(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.settings(shop);
  }

  /**
   * App plan
   * If no plan was choosen the app should always redirect to this page
   */
  @Get('/view/plan')
  @Render('pages/plan')
  plan(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.plan(shop);
  }

  /**
   * App backend / orders
   */
  @Get('/view/orders')
  @Render('pages/orders')
  orders(@Req() req): any {
    const shop = this.extractShopDomain(req);
    return this.viewService.orders(shop);
  }

  /**
   * close the current window
   */
  @Get('/view/close')
  @Render('pages/close')
  close(/*@Req() req*/): any {
    return {};
  }
}
