import { HttpService } from '@ribajs/core';
import Debug from 'debug';
import { ParcelLabSettings } from '../interfaces';

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
}
