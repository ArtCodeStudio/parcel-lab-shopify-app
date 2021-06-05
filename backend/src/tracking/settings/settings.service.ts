import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';
import { DebugService, EventService, IShopifyConnect } from 'nest-shopify';
import { ParcelLabSettingsDocument } from '../interfaces/mongoose/settings.document';
import { ParcelLabSettings } from '../interfaces/settings';

@Injectable()
export class SettingsService {
  protected log = new DebugService('parcelLab:SettingsService');

  constructor(
    @Inject('ParcelLabSettingsModel')
    protected readonly settingsModel: Model<ParcelLabSettingsDocument>,
    protected readonly events: EventService,
  ) {
    this.events.on('webhook:app/uninstalled', this.onUninstalled.bind(this));
    this.events.on('app/installed', this.onInstalled.bind(this));
  }

  protected async onUninstalled(
    myShopifyDomain: IShopifyConnect['shop']['myshopify_domain'],
  ) {
    return this.delete(myShopifyDomain);
  }

  protected async onInstalled(shopifyConnect: IShopifyConnect) {
    return this.setDefaults(shopifyConnect.shop.myshopify_domain);
  }

  async setDefaults(shopDomain: string) {
    const settings = {
      shop_domain: shopDomain,
      user: 0,
      token: '',
      prefer_checkout_shipping_method: false,
      customFields: {
        'no-notify': true,
      },
      languageOverrides: [],
    };
    this.log.debug('[setDefaults] Set default settings', settings);
    return this.createOrUpdate(settings);
  }

  async findByShopDomain(shopDomain: string) {
    const query = { shop_domain: shopDomain };
    return this.settingsModel.findOne(query).exec();
  }

  async createOrUpdate(settings: ParcelLabSettings) {
    // this.settingsModel.update({_id: settings._id}, obj, {upsert: true}, function (err) {...});
    const foundSettings = await this.findByShopDomain(settings.shop_domain);

    // update
    if (foundSettings) {
      this.log.debug(`update`, settings);
      const filter = { _id: foundSettings._id };

      const updateResult = await this.settingsModel.updateOne(filter, settings);

      this.log.debug(`[createOrUpdate] updateResult`, updateResult);
      return this.findByShopDomain(settings.shop_domain);
    }

    // create
    this.log.debug(`create`);
    const newSettings = new this.settingsModel(settings);
    return this.settingsModel.create(newSettings);
  }

  async delete(shopDomain: string) {
    const foundSettings = await this.findByShopDomain(shopDomain);
    if (!foundSettings) {
      const error = new Error(
        `No settings found to delete for shop domain "${shopDomain}"!`,
      );
      this.log.error(error);
      throw error;
    }
    const filter = { _id: foundSettings._id };
    const deleteResult = await this.settingsModel.deleteOne(filter);
    this.log.debug(`[delete] deleteResult`, deleteResult);
    return deleteResult;
  }
}
