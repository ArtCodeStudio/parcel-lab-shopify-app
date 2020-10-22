import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';
import { DebugService, EventService, IShopifyConnect } from 'nest-shopify';
import { ParcelLabSettingsDocument } from '../interfaces/mongoose/settings.document';
import { ParcelLabSettings } from '../interfaces/settings';

@Injectable()
export class SettingsService {

    protected logger = new DebugService('parcelLab:SettingsService');

    constructor(
        @Inject('ParcelLabSettingsModel') protected readonly settingsModel: Model<ParcelLabSettingsDocument>,
        protected readonly shopifyEvents: EventService,
    ) {
        // Delete settings if app is uninstalled
        this.shopifyEvents.on('webhook:app/uninstalled', async (shop: IShopifyConnect['shop']) => {
            this.logger.warn('webhook:app/uninstalled:', shop.myshopify_domain);
            this.deleteByShopDomain(shop.myshopify_domain)
            .then((result) => {
                this.logger.debug('deleted parcelLab settings for ' + shop.myshopify_domain, result);
            })
            .catch((error: Error) => {
                this.logger.error(`[${shop.myshopify_domain}] Error on delete parcelLab settings: ${error.message}`, error);
            });
        });
    }

    async findByShopDomain(shopDomain: string) {
        const query = { 'shop_domain': shopDomain };
        return this.settingsModel.findOne(query).exec();
    }

    async createOrUpdate(settings: ParcelLabSettings ) {
        // this.settingsModel.update({_id: settings._id}, obj, {upsert: true}, function (err) {...});
        return this.findByShopDomain(settings.shop_domain)
        .then(async (foundSettings) => {
            // update
            if (foundSettings) {
                return this.settingsModel.updateOne({_id: foundSettings._id}, {
                    user: settings.user,
                    token: settings.token,
                    prefer_checkout_shipping_method: settings.prefer_checkout_shipping_method,
                  }, { runValidators: true })
                  .then((updateResult) => {
                    this.logger.debug(`updateOne updateResult: %O`, updateResult);
                    return this.findByShopDomain(settings.shop_domain);
                  });
            }
            // create
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

    async deleteByShopDomain(shopDomain: string) {
        const settings = await this.findByShopDomain(shopDomain);
        if (settings) {
            return this.settingsModel.deleteOne({"_id": settings._id}).exec();
        }
    }
}
