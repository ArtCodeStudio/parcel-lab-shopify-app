import { HttpService } from '@ribajs/core';
import Debug from 'debug';
import { ParcelLabSettings, ParcellabSearchResponse } from '../interfaces';

export class ParcelLabService {
  protected debug = Debug('services:ParcelLabService');

  public async getSettings() {
    const settings = (await HttpService.getJSON(
      `/parcel-lab/settings`,
    )) as ParcelLabSettings | null;
    this.debug('settings', settings);
    return settings;
  }

  public async setSettings(settings: ParcelLabSettings) {
    return HttpService.post(`/parcel-lab/settings`, { settings }, 'json');
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

    const list = (await HttpService.getJSON(url)) as ParcellabSearchResponse;
    this.debug('list', list);
    return list;
  }
}
