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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const nest_shopify_1 = require("nest-shopify");
let SettingsService = class SettingsService {
    constructor(settingsModel, shopifyEvents) {
        this.settingsModel = settingsModel;
        this.shopifyEvents = shopifyEvents;
        this.logger = new nest_shopify_1.DebugService('parcelLab:SettingsService');
        this.shopifyEvents.on('webhook:app/uninstalled', async (shop) => {
            this.logger.warn('webhook:app/uninstalled:', shop.myshopify_domain);
            this.deleteByShopDomain(shop.myshopify_domain)
                .then((result) => {
                this.logger.debug('deleted parcelLab settings for ' + shop.myshopify_domain, result);
            })
                .catch((error) => {
                this.logger.error(`[${shop.myshopify_domain}] Error on delete parcelLab settings: ${error.message}`, error);
            });
        });
    }
    async findByShopDomain(shopDomain) {
        const query = { 'shop_domain': shopDomain };
        return this.settingsModel.findOne(query).exec();
    }
    async createOrUpdate(settings) {
        return this.findByShopDomain(settings.shop_domain)
            .then(async (foundSettings) => {
            if (foundSettings) {
                return this.settingsModel.updateOne({ _id: foundSettings._id }, {
                    user: settings.user,
                    token: settings.token,
                    prefer_checkout_shipping_method: settings.prefer_checkout_shipping_method,
                }, { runValidators: true })
                    .then((updateResult) => {
                    this.logger.debug(`updateOne updateResult: %O`, updateResult);
                    return this.findByShopDomain(settings.shop_domain);
                });
            }
            this.logger.debug(`create`);
            const newSettings = new this.settingsModel({
                user: settings.user,
                token: settings.token,
                shop_domain: settings.shop_domain,
                prefer_checkout_shipping_method: settings.prefer_checkout_shipping_method,
            });
            return this.settingsModel.create(newSettings);
        });
    }
    async deleteByShopDomain(shopDomain) {
        const settings = await this.findByShopDomain(shopDomain);
        if (settings) {
            return this.settingsModel.deleteOne({ "_id": settings._id }).exec();
        }
    }
};
SettingsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ParcelLabSettingsModel')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, nest_shopify_1.EventService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map