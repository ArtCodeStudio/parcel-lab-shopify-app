import { params } from './params';
import * as utils from './utils';
import { ParcellabTracking, ParcellabOrder, ParcellabSearchResponse } from './interfaces'

// modules
import got from 'got';
import { Agent } from "https";
import ø from 'validator';
import _ from 'underscore';
import { stringify as QueryString } from 'querystring';

/**
 * Based on https://bitbucket.org/parcellab/sdk-node/src/master/index.js
 */
export class ParcelLabApi {
  /**
   * Constructor of CheckpointAnalyser, needs to be supplied the courier and options if available
   * @param {Number} user
   * @param {String} token
   */
  constructor(protected user: number, protected token: string) {
      if (!ø.isInt(user.toString()) || token.length < 30) {
          throw new Error('Invalid user/ token combination');
      }
      
      this.user = user;
      this.token = token;
  }

  //////////////////////
  // Public Functions //
  //////////////////////

  /**
   * Creates or updates a new tracking on the parcelLab API.
   * Please note: Only use this method if you have a tracking number, if you want to track a order before you have a tracking number, use `createOrUpdateOrder` instead.
   * @param payload Specifies the tracking to be created
   * @param test For testing only, if true this creates a tracking mock
   */
  public async createOrUpdateTracking(payload: ParcellabTracking, test: boolean): Promise<string[]> {
    payload = utils.deleteEmptyValues(payload);
    const { error, isValid} = this.checkPayload(payload, 'tracking');

    if (!isValid) {
      throw new Error(error);
    }

    const payloads = this.multiplyOnTrackingNumber(payload);
    const results: string[] = [];

    for (const payload of payloads) {
      const result = await this.postTrackingToParcelLabAPI(payload, this.user, this.token, test)
      results.push(result);
    }

    return results;
  }

  /**
   * Creates or updates a new order on the parcelLab API
   *
   * Please note: If you have used this method to track the order the first time you must also use this method to update the order,
   * also if the order has a tracking number.
   * Please not not use both methods `createOrUpdateOrder` and `createOrUpdateTracking` for the same order.
   * @param payload Specifies the order to be created
   * @param test For testing only, if true this creates a tracking mock
   */
  public async createOrUpdateOrder(payload: ParcellabOrder, test: boolean): Promise<string[]> {
    payload = utils.deleteEmptyValues(payload);
    const { error, isValid} = this.checkPayload(payload, 'order');

    if (!isValid) {
      throw new Error(error);
    }

    const payloads = this.multiplyOnTrackingNumber(payload);
    const results: string[] = [];

    for (const payload of payloads) {
      const result = await this.postOrderToParcelLabAPI(payload, this.user, this.token, test);
      results.push(result);
    }

    return results;
  }

  /**
   * Checking last transfer via API
   * @see https://how.parcellab.works/docs/integration-quick-start/creating-a-new-tracking/api#checking-last-transfer-via-api
   * @param search Any search string
   * @param page What page to show (pagination), defaults to 0
   * @param size Number of entries on a page, defaults to 24
   */
  public async search(search?: string, page?: number, size?: number): Promise<ParcellabSearchResponse> {
    const url = params.endpoint + 'v2/search/';
    const query = utils.deleteEmptyValues({ s: search, p: page, pSize: size });
    return this.get(url, query, this.user, this.token, 'json') as Promise<ParcellabSearchResponse>;
  }

  //////////////////////////
  // Dealing with payload //
  //////////////////////////

  /**
   * Checks whether a payload is valid
   * @param payload Payload to be transmitted to parcelLab API
   */
  protected checkPayload(payload: ParcellabOrder | ParcellabTracking, endpoint: 'tracking' | 'order'): { error: string | null, isValid?: boolean } {
    const requiredKeys = params[endpoint].requiredKeys;
    const allowedKeys = requiredKeys.concat(params.allowedKeys);
    if (utils.objHasKeys(payload, requiredKeys)) {
      const keyChecker = utils.objHasOnlyKeys(payload, allowedKeys);
      if (!keyChecker.allAllowed) {
        return { error: 'Used not allowed keys: ' + keyChecker.unallowed.join(', '), isValid: false };
      }

      let isValid = true;
      let error = '';
      const datachecks = params.datachecks;

      for (let i = 0; i < datachecks.email.length; i++) {
        if (!_.isNull(payload[datachecks.email[i]]) && !_.isUndefined(payload[datachecks.email[i]])) {
          isValid = isValid && ø.isEmail(payload[datachecks.email[i]]);
        }
      }
      if (!isValid) error = 'Field to be required to be an email is not an email';

      for (let j = 0; j < datachecks.number.length; j++) {
        if (!_.isNull(payload[datachecks.number[j]]) && !_.isUndefined(payload[datachecks.number[j]])) {
          isValid = isValid && typeof payload[datachecks.number[j]] === 'number';
        }
      }
      if (!isValid) error = 'Field to be required to be a number is not a number';

      for (let k = 0; k < datachecks.boolean.length; k++) {
        if (!_.isNull(payload[datachecks.boolean[k]]) && !_.isUndefined(payload[datachecks.boolean[k]])) {
          isValid = isValid && (typeof payload[datachecks.boolean[k]] === 'boolean');
        }
      }
      if (!isValid) error = 'Field to be required to be a bool is not a bool';

      return { error, isValid };

    } else {
      return { error: 'Required keys missing', isValid: false };
    }
  }
  
  /**
   * Checks whether the payload has multiple tracking numbers in its key
   * @param payload payload to be checked for multieple tracking numbers
   * @return String for termination of tracking number sequence or null if no multiples
   */
  protected hasMultipleTrackingNumbers(payload: ParcellabOrder | ParcellabTracking): string {
    if (_.isNull(payload.tracking_number)) return null;
    if (_.isObject(payload.tracking_number)) return 'json';
    if (Array.isArray(payload.tracking_number)) {
      return 'array';
    }
    if (_.isString(payload.tracking_number)) {
      const terminators = ['|', ','];
      for (let i = 0; i < terminators.length; i++) {
        if (payload.tracking_number.indexOf(terminators[i]) > -1) return terminators[i];
      }
    }
    return null;
  }
  
  /**
   * Creates an array of payloads out of a single payload with multiples in the tracking_number
   * @param payload Payload to be multiplied, with a tracking_number like so:
   *                          {ups:["1Z74845R6842887612","1Z74845R6842758029"]}
   * @return Array of payloads with single tracking numbers
   */
  protected multiplyOnTrackingNumber(payload: ParcellabOrder | ParcellabTracking): any[] {
    const terminator = this.hasMultipleTrackingNumbers(payload);
    if (terminator === null) return [payload];

    const tnos = [];
    if (terminator === 'json') {
      const json = payload.tracking_number;
      const jsonCouriers = _.keys(json);
      for (let k = 0; k < jsonCouriers.length; k++) {
          const courier = this.guessCourier(jsonCouriers[k], payload.destination_country_iso3);
          const jsonTnos = json[jsonCouriers[k]];
          for (let l = 0; l < jsonTnos.length; l++) {
              tnos.push({
                  courier,
                  tracking_number: jsonTnos[l]
              });
          }
      }
    } else if (terminator === 'array') {
      for (const tracking_number of payload.tracking_number) {
        tnos.push({
          courier: payload.courier,
          tracking_number: tracking_number,
        });
      }
    } else if (terminator.length == 1) {
      const tnos_raw = (payload.tracking_number as string).split(terminator);
      for (let j = 0; j < tnos_raw.length; j++) {
        tnos.push({
          courier: payload.courier,
          tracking_number: tnos_raw[j]
        });
      }
    }

    const payloads = []; // array of new payloads
    for (let i = 0; i < tnos.length; i++) {
      const newPayload = _.extend({}, payload);
  
      newPayload.courier = tnos[i].courier;
      newPayload.tracking_number = tnos[i].tracking_number;
  
      payloads.push(newPayload);
    }

    return payloads;
  }
  
  /**
   * Retrieves courier code from mappings for given courier name if available
   * @param input Name of courier as given by input
   * @param destinationCountryIso3
   * @return Mapping to actual courier code
   */
  protected guessCourier(input: string, destinationCountryIso3?: string): string {
    let output = input;
    output = output.trim().toLowerCase().replace(/ /g,"-");

    if (params.couriersAppendCountry.includes(output) && destinationCountryIso3) {
      console.warn("Append country code to courier, please check if this is the correct courier you use.")
      destinationCountryIso3 = destinationCountryIso3.toLowerCase();
      output = `${output}-${destinationCountryIso3}`;
    }

    try {
      const knownInputs = _.keys(params.couriers);
      if (knownInputs.indexOf(input.toLowerCase()) > -1) {
        output = params.couriers[input.toLowerCase()];
      }
    } catch (e) {
      console.warn('Unknown courier: ' + input);
    }
    return output;
  }
  
  ////////////////
  // API Access //
  ////////////////
  
  /**
   * Posts a new tracking to the parcelLab API to be tracked
   * @see https://how.parcellab.works/docs/integration-quick-start/creating-a-new-tracking/api
   * 
   * @param payload Payload to be transmitted to parcelLab API
   * @param user
   * @param token
   * @param test For testing only, if true this creates a tracking mock
   */
  protected async postTrackingToParcelLabAPI(payload: ParcellabOrder | ParcellabTracking, user: number, token: string, test: boolean) {
    console.debug('postTrackingToParcelLabAPI', payload);
    
    let url: string;
    if (test) {
      url = params.mockEndpoint + 'track/';
    } else {
      url = params.endpoint + 'track/';
    }

    const res = await this.post(url, payload, user, token);

    if (test) {
      const mock = await this.validateMostRecentTracking(this.user, this.token);
      console.debug("postTrackingToParcelLabAPI mock", mock);
    }

    return res;
  }

  /**
   * Posts a new tracking to the parcelLab API to be tracked
   * @see https://how.parcellab.works/docs/integration-quick-start/creating-a-new-order/api
   * 
   * @param payload Payload to be transmitted to parcelLab API
   * @param user
   * @param token
   * @param test For testing only, if true this creates a tracking mock
   */
  protected async postOrderToParcelLabAPI(payload: ParcellabOrder | ParcellabTracking, user: number, token: string, test: boolean) {
    console.debug('postOrderToParcelLabAPI', payload);
    
    let url: string;
    if (test) {
      url = params.mockEndpoint + 'presage/';
    } else {
      url = params.endpoint + 'presage/';
    }

    return this.post(url, payload, user, token);
  }

  /**
   * You can view your most request to the mock endpoint for 3 hours after you placed your request by calling the same route with the GET method. For your convenience, user and token can be placed as URL query parameters.
   */
  protected async validateMostRecentTracking(user: number, token: string) {
    const url = params.mockEndpoint + 'track/';
    return this.get(url, { user, token}, user, token);
  }

  protected async post(url: string, data: any, user: number, token: string, responseType = 'text'): Promise<any> {
    return this.request('post', url, data, user, token, responseType);
  }

  protected async get(url: string, params: any, user: number, token: string, responseType = 'text'): Promise<any> {
    return this.request('get', url, params, user, token, responseType);
  }

  protected async request(method: 'post' | 'get', url: string, data: any = {}, user: number, token: string, responseType = 'text'): Promise<string> {
    // prepare request
    const httpsAgent = new Agent({
      rejectUnauthorized: false
    });

    // GET request can't have a body, so we convert the data to a query string
    if (method === 'get') {
      const queryStr = QueryString(data);
      url = url + (queryStr && queryStr.length > 0 ? "?" + queryStr : "");
    }

    console.debug('request url ' + method, url);

    const gotOptions = {
      agent: {
        https: httpsAgent
      },
      https: {
        rejectUnauthorized: false
      },
      json: method === 'post' ? data : undefined,
      responseType,
      headers: {
        // 'Content-Type': 'application/json',
        'user': user.toString(),
        'token': token.toString()
      },
      retry: 3
    };

    const res = await got[method](url, gotOptions as any);
    return res.body;
  }
  
}
