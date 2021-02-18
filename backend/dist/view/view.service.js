"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewService = void 0;
const common_1 = require("@nestjs/common");
const merge = require("deepmerge");
const nest_shopify_1 = require("nest-shopify");
const config_1 = require("@nestjs/config");
let ViewService = class ViewService {
    constructor(configService, shopifyAuthService) {
        this.configService = configService;
        this.shopifyAuthService = shopifyAuthService;
    }
    async getGlobalViewVars(shop, method) {
        return {
            app: this.configService.get('app'),
            shopify: {
                shop,
                apiKey: this.configService.get('shopify.clientID'),
                redirectUri: this.configService.get('shopify.callbackURL'),
            },
            dataset: {
                debug: this.configService.get('app.debug'),
                environment: this.configService.get('app.environment'),
                namespace: method.name,
                title: '',
            },
            page: {
                title: '',
            },
        };
    }
    async terms(shop) {
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
    async install(shop) {
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
    async privacy(shop) {
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
    async app(shop) {
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
    async settings(shop) {
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
    async plan(shop) {
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
    async orders(shop) {
        const vars = await this.getGlobalViewVars(shop, this.orders);
        const title = 'Orders';
        return merge(vars, {
            dataset: {
                title,
            },
            page: {
                title,
            },
        });
    }
    async apiShopify(shop) {
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
    async apiWebhooks(shop) {
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
};
ViewService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        nest_shopify_1.ShopifyAuthService])
], ViewService);
exports.ViewService = ViewService;
//# sourceMappingURL=view.service.js.map