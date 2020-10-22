import got from 'got';
// import { parse as parseUrl } from 'url';
import { stringify as QueryString } from 'querystring';


export class TrackingMoreService {

    /**
     * @param token
     */
    constructor(protected token: string) {        
        this.token = token;
    }

    /**
     * Detect carrier by tracking number
     * @param tracking_number 
     */
    public async detectCarrier(tracking_number: string) {
        return this.post('https://api.trackingmore.com/v2/carriers/detect', { tracking_number }, this.token);
    }

    /**
     * Make a http POST request
     * @param url The url you want to make the request to
     * @param data The data object which you want to transfer in the body of the post request
     * @param token trackingMore token
     * @param responseType The response type, by default 'json'
     */
    protected async post(url: string, data: any, token: string, responseType = 'json'): Promise<any> {
        return this.request('post', url, data, token, responseType);
    }

    /**
     * Make a http GET request
     * @param url The url you want to make the request to
     * @param params The query string parameter values
     * @param token trackingMore token
     * @param responseType The response type, by default 'json'
     */
    protected async get(url: string, params: any, token: string, responseType = 'json'): Promise<any> {
        return this.request('get', url, params, token, responseType);
    }


  /**
   * Make a http request
   * @param url The url you want to make the request to 
   * @param params The query string parameter values 
   * @param token trackingMore token 
   * @param responseType The response type, by default 'json'
   */
    async request(method: 'post' | 'get' | 'delete' | 'put', url: string, data: any = {}, token: string, responseType = 'json') {

        // const parsedUrl = parseUrl(url, true);
        // const isHttp = parsedUrl.protocol === 'http:';
        // const host = parsedUrl.hostname;
        // const port = parsedUrl.port || (isHttp?80:443);
        // const path = parsedUrl.path;

        // GET request can't have a body, so we convert the data to a query string
        if (method === 'get') {
            const queryStr = QueryString(data);
            url = url + (queryStr && queryStr.length > 0 ? "?" + queryStr : "");
        }
    
        // console.debug('request url ' + method, url);
    
        const gotOptions = {
            json: method === 'post' ? data : undefined,
            responseType,
            headers: {
            'Content-Type': 'application/json',
            'Trackingmore-Api-Key': token.toString(),
            // 'Content-Length':Buffer.byteLength(content,"utf8"),
            },
            retry: 3
        };
    
        const res = await got[method](url, gotOptions as any);
        return res.body;
    }
}
