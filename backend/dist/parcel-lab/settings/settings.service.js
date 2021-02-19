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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const nest_shopify_1 = require("nest-shopify");
let SettingsService = class SettingsService {
    constructor(settingsModel, events) {
        this.settingsModel = settingsModel;
        this.events = events;
        this.log = new nest_shopify_1.DebugService('parcelLab:SettingsService');
        this.events.on('webhook:app/uninstalled', this.onUninstalled.bind(this));
        this.events.on('app/installed', this.onInstalled.bind(this));
    }
    async onUninstalled(myShopifyDomain) {
        return this.delete(myShopifyDomain);
    }
    async onInstalled(shopifyConnect) {
        return this.setDefaults(shopifyConnect.shop.myshopify_domain);
    }
    async setDefaults(shopDomain) {
        const settings = {
            shop_domain: shopDomain,
            user: 0,
            token: '',
            customFields: {
                'no-notify': true,
            },
        };
        this.log.debug('[setDefaults] Set default settings', settings);
        return this.createOrUpdate(settings);
    }
    async findByShopDomain(shopDomain) {
        const query = { shop_domain: shopDomain };
        return this.settingsModel.findOne(query).exec();
    }
    async createOrUpdate(settings) {
        const foundSettings = await this.findByShopDomain(settings.shop_domain);
        if (foundSettings) {
            this.log.debug(`update`, settings);
            const filter = { _id: foundSettings._id };
            const updateResult = await this.settingsModel.updateOne(filter, settings);
            this.log.debug(`[createOrUpdate] updateResult`, updateResult);
            return this.findByShopDomain(settings.shop_domain);
        }
        this.log.debug(`create`);
        const newSettings = new this.settingsModel(settings);
        return this.settingsModel.create(newSettings);
    }
    async delete(shopDomain) {
        const foundSettings = await this.findByShopDomain(shopDomain);
        if (!foundSettings) {
            const error = new Error(`No settings found to delete for shop domain "${shopDomain}"!`);
            this.log.error(error);
            throw error;
        }
        const filter = { _id: foundSettings._id };
        const deleteResult = await this.settingsModel.deleteOne(filter);
        this.log.debug(`[delete] deleteResult`, deleteResult);
        return deleteResult;
    }
};
SettingsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ParcelLabSettingsModel')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        nest_shopify_1.EventService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map