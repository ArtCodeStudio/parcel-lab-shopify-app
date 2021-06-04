import { HttpService } from '@ribajs/core';
import { clearObjFromRiba } from '@ribajs/utils';
import Debug from 'debug';
import { ParcelLabSettings, ParcellabSearchResponse } from '../interfaces';

export class ParcelLabService {
  protected debug = Debug('services:ParcelLabService');

  public async getSettings() {
    const req = await HttpService.getJSON<ParcelLabSettings | 'null' | null>(
      `/parcel-lab/settings`,
    );
    const settings: Partial<ParcelLabSettings> =
      req.body && req.body !== 'null' ? req.body : {};
    settings.user = settings.user || 0;
    settings.token = settings.token || '';
    settings.customFields = settings.customFields || {
      'no-notify': false,
    };
    settings.customFields['no-notify'] =
      settings.customFields['no-notify'] || false;
    settings.prefer_checkout_shipping_method =
      settings.prefer_checkout_shipping_method || false;
    settings.languageFallbacks = settings.languageFallbacks || [];

    this.debug('settings', settings);
    return settings as ParcelLabSettings;
  }

  public async setSettings(settings: ParcelLabSettings) {
    const clearSettings = clearObjFromRiba(settings);

    this.debug('setSettings', clearSettings);
    return HttpService.post(
      `/parcel-lab/settings`,
      { settings: clearSettings },
      'json',
    );
  }

  public async listTrackings(
    search?: string,
    page?: number,
    size?: number,
  ): Promise<ParcellabSearchResponse> {
    const query: any = {};
    if (search) query.search = search;
    if (page) query.page = page;
    if (size) query.size = size;
    const queryStr = new URLSearchParams(query).toString();
    const url =
      '/parcel-lab/tracking/list' +
      (queryStr && queryStr.length > 0 ? '?' + queryStr : '');

    const list = (await HttpService.getJSON(url))
      .body as ParcellabSearchResponse;
    this.debug('list', list);
    return list;
  }
}
