"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelLabApi = void 0;
const params_1 = require("./params");
const utils = require("./utils");
const got_1 = require("got");
const https_1 = require("https");
const validator_1 = require("validator");
const underscore_1 = require("underscore");
const querystring_1 = require("querystring");
class ParcelLabApi {
    constructor(user, token) {
        this.user = user;
        this.token = token;
        if (!validator_1.default.isInt(user.toString()) || token.length < 30) {
            throw new Error('Invalid user/ token combination');
        }
        this.user = user;
        this.token = token;
    }
    async createOrUpdateTracking(payload, test) {
        payload = utils.deleteEmptyValues(payload);
        const { error, isValid } = this.checkPayload(payload, 'tracking');
        if (!isValid) {
            throw new Error(error);
        }
        const payloads = this.multiplyOnTrackingNumber(payload);
        const results = [];
        for (const payload of payloads) {
            const result = await this.postTrackingToParcelLabAPI(payload, this.user, this.token, test);
            results.push(result);
        }
        return results;
    }
    async createOrUpdateOrder(payload, test) {
        payload = utils.deleteEmptyValues(payload);
        const { error, isValid } = this.checkPayload(payload, 'order');
        if (!isValid) {
            throw new Error(error);
        }
        const payloads = this.multiplyOnTrackingNumber(payload);
        const results = [];
        for (const payload of payloads) {
            const result = await this.postOrderToParcelLabAPI(payload, this.user, this.token, test);
            results.push(result);
        }
        return results;
    }
    async search(search, page, size) {
        const url = params_1.params.endpoint + 'v2/search/';
        const query = utils.deleteEmptyValues({ s: search, p: page, pSize: size });
        return this.get(url, query, this.user, this.token, 'json');
    }
    checkPayload(payload, endpoint) {
        const requiredKeys = params_1.params[endpoint].requiredKeys;
        const allowedKeys = requiredKeys.concat(params_1.params.allowedKeys);
        if (utils.objHasKeys(payload, requiredKeys)) {
            if (utils.objHasOnlyKeys(payload, allowedKeys)) {
                let isValid = true;
                let error = '';
                const datachecks = params_1.params.datachecks;
                for (let i = 0; i < datachecks.email.length; i++) {
                    if (!underscore_1.default.isNull(payload[datachecks.email[i]]) &&
                        !underscore_1.default.isUndefined(payload[datachecks.email[i]])) {
                        isValid = isValid && validator_1.default.isEmail(payload[datachecks.email[i]]);
                    }
                }
                if (!isValid)
                    error = 'Field to be required to be an email is not an email';
                for (let j = 0; j < datachecks.number.length; j++) {
                    if (!underscore_1.default.isNull(payload[datachecks.number[j]]) &&
                        !underscore_1.default.isUndefined(payload[datachecks.number[j]])) {
                        isValid =
                            isValid && typeof payload[datachecks.number[j]] === 'number';
                    }
                }
                if (!isValid)
                    error = 'Field to be required to be a number is not a number';
                for (let k = 0; k < datachecks.boolean.length; k++) {
                    if (!underscore_1.default.isNull(payload[datachecks.boolean[k]]) &&
                        !underscore_1.default.isUndefined(payload[datachecks.boolean[k]])) {
                        isValid =
                            isValid && typeof payload[datachecks.boolean[k]] === 'boolean';
                    }
                }
                if (!isValid)
                    error = 'Field to be required to be a bool is not a bool';
                return { error, isValid };
            }
            else {
                return { error: 'Some keys are not allowed', isValid: false };
            }
        }
        else {
            return { error: 'Required keys missing', isValid: false };
        }
    }
    hasMultipleTrackingNumbers(payload) {
        if (underscore_1.default.isNull(payload.tracking_number))
            return null;
        if (underscore_1.default.isObject(payload.tracking_number))
            return 'json';
        if (Array.isArray(payload.tracking_number)) {
            return 'array';
        }
        if (underscore_1.default.isString(payload.tracking_number)) {
            const terminators = ['|', ','];
            for (let i = 0; i < terminators.length; i++) {
                if (payload.tracking_number.indexOf(terminators[i]) > -1)
                    return terminators[i];
            }
        }
        return null;
    }
    multiplyOnTrackingNumber(payload) {
        const terminator = this.hasMultipleTrackingNumbers(payload);
        if (terminator === null)
            return [payload];
        const tnos = [];
        if (terminator === 'json') {
            const json = payload.tracking_number;
            const jsonCouriers = underscore_1.default.keys(json);
            for (let k = 0; k < jsonCouriers.length; k++) {
                const courier = this.guessCourier(jsonCouriers[k], payload.destination_country_iso3);
                const jsonTnos = json[jsonCouriers[k]];
                for (let l = 0; l < jsonTnos.length; l++) {
                    tnos.push({
                        courier,
                        tracking_number: jsonTnos[l],
                    });
                }
            }
        }
        else if (terminator === 'array') {
            for (const tracking_number of payload.tracking_number) {
                tnos.push({
                    courier: payload.courier,
                    tracking_number: tracking_number,
                });
            }
        }
        else if (terminator.length == 1) {
            const tnos_raw = payload.tracking_number.split(terminator);
            for (let j = 0; j < tnos_raw.length; j++) {
                tnos.push({
                    courier: payload.courier,
                    tracking_number: tnos_raw[j],
                });
            }
        }
        const payloads = [];
        for (let i = 0; i < tnos.length; i++) {
            const newPayload = underscore_1.default.extend({}, payload);
            newPayload.courier = tnos[i].courier;
            newPayload.tracking_number = tnos[i].tracking_number;
            payloads.push(newPayload);
        }
        return payloads;
    }
    guessCourier(input, destinationCountryIso3) {
        let output = input;
        output = output.trim().toLowerCase().replace(/ /g, '-');
        if (params_1.params.couriersAppendCountry.includes(output) &&
            destinationCountryIso3) {
            console.warn('Append country code to courier, please check if this is the correct courier you use.');
            destinationCountryIso3 = destinationCountryIso3.toLowerCase();
            output = `${output}-${destinationCountryIso3}`;
        }
        try {
            const knownInputs = underscore_1.default.keys(params_1.params.couriers);
            if (knownInputs.indexOf(input.toLowerCase()) > -1) {
                output = params_1.params.couriers[input.toLowerCase()];
            }
        }
        catch (e) {
            console.warn('Unknown courier: ' + input);
        }
        return output;
    }
    async postTrackingToParcelLabAPI(payload, user, token, test) {
        console.debug('postTrackingToParcelLabAPI', payload);
        let url;
        if (test) {
            url = params_1.params.mockEndpoint + 'track/';
        }
        else {
            url = params_1.params.endpoint + 'track/';
        }
        const res = await this.post(url, payload, user, token);
        if (test) {
            const mock = await this.validateMostRecentTracking(this.user, this.token);
            console.debug('postTrackingToParcelLabAPI mock', mock);
        }
        return res;
    }
    async postOrderToParcelLabAPI(payload, user, token, test) {
        console.debug('postOrderToParcelLabAPI', payload);
        let url;
        if (test) {
            url = params_1.params.mockEndpoint + 'presage/';
        }
        else {
            url = params_1.params.endpoint + 'presage/';
        }
        return this.post(url, payload, user, token);
    }
    async validateMostRecentTracking(user, token) {
        const url = params_1.params.mockEndpoint + 'presage/';
        return this.get(url, { user, token }, user, token);
    }
    async post(url, data, user, token, responseType = 'text') {
        return this.request('post', url, data, user, token, responseType);
    }
    async get(url, params, user, token, responseType = 'text') {
        return this.request('get', url, params, user, token, responseType);
    }
    async request(method, url, data = {}, user, token, responseType = 'text') {
        const httpsAgent = new https_1.Agent({
            rejectUnauthorized: false,
        });
        if (method === 'get') {
            const queryStr = querystring_1.stringify(data);
            url = url + (queryStr && queryStr.length > 0 ? '?' + queryStr : '');
        }
        console.debug('request url', url);
        const gotOptions = {
            agent: {
                https: httpsAgent,
            },
            https: {
                rejectUnauthorized: false,
            },
            json: method === 'post' ? data : undefined,
            responseType,
            headers: {
                user: user.toString(),
                token: token.toString(),
            },
            retry: 3,
        };
        const res = await got_1.default[method](url, gotOptions);
        return res.body;
    }
}
exports.ParcelLabApi = ParcelLabApi;
//# sourceMappingURL=parcel-lab-api.js.map