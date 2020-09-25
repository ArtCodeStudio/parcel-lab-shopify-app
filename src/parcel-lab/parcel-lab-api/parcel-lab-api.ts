import { params } from './params';
import * as utils from './utils';

// modules

import Request = require('request');
import Async = require('async');
import ø from 'validator';
import _ from 'underscore';

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
        if (!(ø.isInt(user.toString()) && token.length == 30)) {
            throw new Error('Invalid user/ token combination');
        }
        
        this.user = user;
        this.token = token;
    }

    //////////////////////
    // Public Functions //
    //////////////////////

    /**
     * creates a new tracking on the parcelLab API
     * @param  {Object}   payload        specifies the tracking to be created
     * @param  {Function} callback       (error, result)
     */
    createTracking(payload: any, callback: (error: string | null, result?) => void) {
        const user_id = this.user;
        const token = this.token;
    
        this.checkPayload(payload, (err, isValidPayload) => {

            if (isValidPayload) {
        
              const payloads = this.multiplyOnTrackingNumber(payload);
              Async.eachSeries(payloads, (p, callback) => {
        
                this.postTrackingToParcelLabAPI(p, user_id, token, (err, res) => {
                  callback(new Error(err));
                });
        
              }, (err) => {
                if (err) callback(err.message, {
                  result: 'error',
                  message: 'Tracking to be created is invalid'
                });
                else callback(null, {
                  result: 'success',
                  message: 'All trackings posted'
                });
              });
        
            } else callback('Nothing posted', {
              result: 'error',
              message: err
            });
        
          });
    }

    //////////////////////////
    // Dealing with payload //
    //////////////////////////

    /**
     * checks whether a payload is valid
     * @param  {Object} payload payload to be transmitted to parcelLab API
     * @param  {Function} callback (error, isValid)
     */
    checkPayload(payload: any, callback: (error: string | null, isValid?: boolean) => void ) {

        const requiredKeys = params.requiredKeys;
        const allowedKeys = requiredKeys.concat(params.allowedKeys);
    
        if (utils.objHasKeys(payload, requiredKeys)) {
            if (utils.objHasOnlyKeys(payload, allowedKeys)) {
        
                let okay = true;
                let fail = '';
                const datachecks = params.datachecks;
        
                for (let i = 0; i < datachecks.email.length; i++) {
                    if (!_.isNull(payload[datachecks.email[i]]) && !_.isUndefined(payload[datachecks.email[i]])) {
                        // TODO CHECKME
                        okay = okay && ø.isEmail(payload[datachecks.email[i]]);
                    }
                }
                if (!okay) fail = 'Field to be required to be an email is not an email';
        
                for (let j = 0; j < datachecks.number.length; j++) {
                    if (!_.isNull(payload[datachecks.number[j]]) && !_.isUndefined(payload[datachecks.number[j]])) {
                        // TODO CHECKME
                        okay = okay && typeof payload[datachecks.number[j]] === 'number';
                    }
                }
                if (!okay) fail = 'Field to be required to be a number is not a number';
        
                for (let k = 0; k < datachecks.boolean.length; k++) {
                    if (!_.isNull(payload[datachecks.boolean[k]]) && !_.isUndefined(payload[datachecks.boolean[k]])) {
                        // TODO CHECKME
                        okay = okay && (typeof payload[datachecks.boolean[k]] === 'boolean');
                    }
                }
                if (!okay) fail = 'Field to be required to be a bool is not a bool';
        
                callback(fail, okay);
        
            } else callback('Some keys are not allowed', false);
        } else callback('Required keys missing', false);
    }
    
    /**
     * Checks whether the payload has multiple tracking numbers in its key
     * @param payload payload to be checked for multieple tracking numbers
     * @return String for termination of tracking number sequence or null if no multiples
     */
    hasMultipleTrackingNumbers(payload: any): string {
        if (_.isNull(payload.tracking_number)) return null;
        if (_.isObject(payload.tracking_number)) return 'json';
        const terminators = ['|', ','];
        for (let i = 0; i < terminators.length; i++) {
            if (payload.tracking_number.indexOf(terminators[i]) > -1) return terminators[i];
        }
        return null;
    }
    
    /**
     * creates an array of payloads out of a single payload with multiples in the tracking_number
     * @param  {Object} payload payload to be multiplied, with a tracking_number like so:
     *                          {ups:["1Z74845R6842887612","1Z74845R6842758029"]}
     * @return {[Object]}         Array of payloads with single tracking numbers
     */
    multiplyOnTrackingNumber(payload: any): any[] {
        const terminator = this.hasMultipleTrackingNumbers(payload);
        if (terminator === null) return [payload];
    
        const tnos = [];
        if (terminator == 'json') {
        const json = payload.tracking_number;
        const jsonCouriers = _.keys(json);
        for (let k = 0; k < jsonCouriers.length; k++) {
            const jsonCourier = this.guessCourier(jsonCouriers[k]);
            const jsonTnos = json[jsonCouriers[k]];
            for (let l = 0; l < jsonTnos.length; l++) {
                tnos.push({
                    courier: jsonCourier,
                    tracking_number: jsonTnos[l]
                });
            }
        }
    
        } else if (terminator.length == 1) {
            const tnos_raw = payload.tracking_number.split(terminator);
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
     * retrieves courier code from mappings for given courier name if available
     * @param input name of courier as given by input
     * @return mapping to actual courier code
     */
    guessCourier(input: string): string {
        let output = input;
        try {
            const knownInputs = _.keys(params.couriers);
            if (knownInputs.indexOf(input.toLowerCase()) > -1) {
                output = params.couriers[input.toLowerCase()];
            }
        } catch (e) {
            console.error(e)
        }
        return output;
    }
    
    ////////////////
    // API Access //
    ////////////////
    
    /**
     * posts a new tracking to the parcelLab API to be tracked
     * @param  {Object}   payload        payload to be transmitted to parcelLab API
     * @param  {Function} callback       (error, result)
     */
    postTrackingToParcelLabAPI(payload: any, user: number, token: string, callback: (error: string | null, result?) => void) {
    
        console.log(payload);
    
        const url = params.endpoint + 'track/';
    
        // prepare request
        const options = {
        rejectUnauthorized: false,
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user': user.toString(),
            'token': token.toString()
        },
        json: true,
        body: payload
        };
    
        // perform request
        Request(options, function(error, response, body) {
            callback(error, body);
        });
    
    }
    
}
