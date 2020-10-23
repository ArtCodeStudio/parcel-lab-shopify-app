import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * TODO currently this class is not used
 * Carrier tracking numbers patterns from https://www.iship.com/trackit/info.aspx?info=24 AND https://www.canadapost.ca/web/en/kb/details.page?article=how_to_track_a_packa&cattype=kb&cat=receiving&subcat=tracking
 * @see https://github.com/niradler/tracking-number-validation/blob/master/src/index.js
 * @see https://stackoverflow.com/a/53619924/1465919
 * @see https://github.com/jkeen/tracking_number_data
 * @see https://github.com/egg-/delivery-tracker
 */
export class CourierDetectorService {
    couriers = {
        /**
         * UPS tracking numbers usually begin with "1Z", contain 18 characters, and do not contain the letters "O", "I", or "Q".
         */
        ups: {
            patterns: [new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i)],
            tracking_url: (trackNum: string) => `https://wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&loc=en_US&tracknum=${trackNum}&Requester=trkinppg`
        },

        /**
         * USPS Tracking numbers are normally 20-22 digits long and do not contain letters AND USPS Express Mail tracking numbers are normally 13 characters long, begin with two letters, and end with "US".
         */
        usps: {
            patterns: [
                new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|95|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i), new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i), new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i)
            ],
            tracking_url: (trackNum: string) => `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackNum}`
        },

        /**
         * 
         */
        ontrac: {
            patterns: [new RegExp(/\b(C\d{14})\b/i)],
            tracking_url: (trackNum: string) => `http://www.ontrac.com/trackres.asp?tracking_number=${trackNum}`
        },

        /**
         * DHL tracking numbers are normally 10 or 11 digits long and do not contain letters.
         */
        dhl: {
            patterns: [new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i)],
            tracking_url: (trackNum: string) => `http://www.dhl.com/en/express/tracking.html?AWB=${trackNum}&brand=DHL`
        },

        /**
         * FedEx Express tracking numbers are normally 12 digits long and do not contain letters AND FedEx Ground tracking numbers are normally 15 digits long and do not contain letters.
         */
        fedex: {
            patterns: [new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3})?)\b/i)],
            tracking_url: (trackNum: string) => `https://www.fedex.com/apps/fedextrack/index.html?tracknumber=${trackNum}`
        },

        /**
         * 16 numeric digits (0000 0000 0000 0000) AND 13 numeric and alphabetic characters (AA 000 000 000 AA).
         */
        caPost: {
            patterns: [new RegExp('^[0-9]{16}$|^[A-Z]{2}[0-9]{9}[A-Z]{2}$')],
            tracking_url: (trackNum: string) => `https://www.canadapost.ca/trackweb/en#/search?searchFor=${trackNum}`
        },
    }

    getCourier(trackNum: string) {
        return Object.keys(this.couriers)
        .filter(courier => this.couriers[courier].patterns.filter(pattern => pattern.test(trackNum)).length > 0);
    }

    getCourierOne(trackNum: string) {
        return this.getCourier(trackNum)[0];
    }

    isCourier(trackNum: string, courier: string) {
        return this.getCourier(trackNum).indexOf(courier.toLowerCase()) > -1;
    }

    getTrackingUrl(trackNum: string, courier: string) {
        return courier
        ? this.couriers[courier.toLowerCase()] && this.couriers[courier.toLowerCase()].tracking_url + trackNum
        : this.couriers[this.getCourier(trackNum)[0]].tracking_url + trackNum;
    }

    injectPatterns(courier: string, patt: RegExp | string) {
        return !courier || !this.couriers[courier.toLowerCase()]
            ? false
            : this.couriers[courier.toLowerCase()]
            .patterns
            .push(new RegExp(patt));
    }

    isValid(trackNum: string) {
        return this.getCourier(trackNum).length > 0;
    }
}