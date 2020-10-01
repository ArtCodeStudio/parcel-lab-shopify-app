import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';
import { DebugService } from 'nest-shopify';
import { ParcelLabSettingsDocument } from '../interfaces/mongoose/settings.document';
import { ParcelLabSettings } from '../interfaces/settings';

@Injectable()
export class SettingsService {

    protected logger = new DebugService('parcelLab:SettingsService');

    constructor(@Inject('ParcelLabSettingsModel') protected readonly settingsModel: Model<ParcelLabSettingsDocument>) {

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
                  }, { runValidators: true })
                  .then((updateResult) => {
                    this.logger.debug(`updateOne updateResult`, updateResult);
                    return this.findByShopDomain(settings.shop_domain);
                  });
            }
            // create
            this.logger.debug(`create`);
            const newSettings = new this.settingsModel({
                user: settings.user,
                token: settings.token,
                shop_domain: settings.shop_domain,
            });
            return this.settingsModel.create(newSettings);
        });

    }
}
