"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingMoreService = void 0;
const got_1 = require("got");
const querystring_1 = require("querystring");
class TrackingMoreService {
    constructor(token) {
        this.token = token;
        this.token = token;
    }
    async detectCarrier(tracking_number) {
        return this.post('https://api.trackingmore.com/v2/carriers/detect', { tracking_number }, this.token);
    }
    async post(url, data, token, responseType = 'json') {
        return this.request('post', url, data, token, responseType);
    }
    async get(url, params, token, responseType = 'json') {
        return this.request('get', url, params, token, responseType);
    }
    async request(method, url, data = {}, token, responseType = 'json') {
        if (method === 'get') {
            const queryStr = querystring_1.stringify(data);
            url = url + (queryStr && queryStr.length > 0 ? "?" + queryStr : "");
        }
        const gotOptions = {
            json: method === 'post' ? data : undefined,
            responseType,
            headers: {
                'Content-Type': 'application/json',
                'Trackingmore-Api-Key': token.toString(),
            },
            retry: 3
        };
        const res = await got_1.default[method](url, gotOptions);
        return res.body;
    }
}
exports.TrackingMoreService = TrackingMoreService;
//# sourceMappingURL=tracking-more.service.js.map