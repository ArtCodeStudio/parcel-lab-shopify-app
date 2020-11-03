import { Injectable } from '@nestjs/common';
import { CourierList } from './interfaces';

/**
 * TODO currently this class is not used
 * Carrier tracking numbers patterns from https://www.iship.com/trackit/info.aspx?info=24 AND https://www.canadapost.ca/web/en/kb/details.page?article=how_to_track_a_packa&cattype=kb&cat=receiving&subcat=tracking
 * @see https://github.com/niradler/tracking-number-validation/blob/master/src/index.js
 * @see https://stackoverflow.com/a/53619924/1465919
 * @see https://github.com/jkeen/tracking_number_data
 * @see https://github.com/egg-/delivery-tracker
 */
@Injectable()
export class CourierDetectorService {

    constructor() {/***/}

    couriers: CourierList = {
        /**
         * UPS tracking numbers usually begin with "1Z", contain 18 characters, and do not contain the letters "O", "I", or "Q".
         * E.g. 1Z0370A00400378664
         */
        ups: {
            code: 'ups',
            patterns: [new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i)],
            tracking_url: (trackNum: string) => `https://wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&loc=en_US&tracknum=${trackNum}&Requester=trkinppg`
        },

        /**
         * USPS Tracking numbers are normally 20-22 digits long and do not contain letters AND USPS Express Mail tracking numbers are normally 13 characters long, begin with two letters, and end with "US".
         */
        usps: {
            code: 'usps',
            patterns: [
                new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|95|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i), new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i), new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i)
            ],
            tracking_url: (trackNum: string) => `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackNum}`
        },

        /**
         * 
         */
        ontrac: {
            code: 'ontrac',
            patterns: [new RegExp(/\b(C\d{14})\b/i)],
            tracking_url: (trackNum: string) => `http://www.ontrac.com/trackres.asp?tracking_number=${trackNum}`
        },

        /**
         * DHL Espress / International tracking numbers are normally 10 or 11 digits long and do not contain letters.
         */
        dhl: {
            code: 'dhl',
            patterns: [new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i)],
            tracking_url: (trackNum: string) => `http://www.dhl.com/en/express/tracking.html?AWB=${trackNum}&brand=DHL`
        },

        /**
         * Starts with 2 numbers, following by 9 numeric digits and ends with DE (CR236025058DE)
         * Or 20 numeric digits (00340434463400054439)
         */
        'dhl-germany': {
            code: 'dhl-germany',
            patterns: [new RegExp('^[A-Z]{2}[0-9]{9}DE$'), new RegExp('^[0-9]{20}$')],
            tracking_url: (trackNum: string) => `https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${trackNum}`
        },

        /**
         * Starts with 09 following by 12 more numeric digits and ends with a alphabetic character or a numeric digit (09445440528278N)
         * WARNING fedex can also have 15 numeric digits!
         */
        dpd: {
            code: 'dpd',
            patterns: [new RegExp('^09[0-9]{12}[A-Z0-9]{1}$')],
            tracking_url: (trackNum: string) => `https://tracking.dpd.de/status/de_DE/parcel/${trackNum}`
        },

        /**
         * FedEx Express tracking numbers are normally 12 digits long and do not contain letters AND FedEx Ground tracking numbers are normally 15 digits long and do not contain letters.
         */
        fedex: {
            code: 'fedex',
            patterns: [new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3})?)\b/i)],
            tracking_url: (trackNum: string) => `https://www.fedex.com/apps/fedextrack/index.html?tracknumber=${trackNum}`
        },

        /**
         * 16 numeric digits (0000 0000 0000 0000) AND 13 numeric and alphabetic characters (AA 000 000 000 AA).
         * TODO check key name
         */
        'post-ca': {
            code: 'post-ca',
            patterns: [new RegExp('^[0-9]{16}$|^[A-Z]{2}[0-9]{9}[A-Z]{2}$')],
            tracking_url: (trackNum: string) => `https://www.canadapost.ca/trackweb/en#/search?searchFor=${trackNum}`
        },

        /**
         * Starts with Z and ends with 16 numeric digits. The last 5 numeric digits are the zip code (Z6100130652673000)
         */
        colisprivee: {
            code: 'colisprivee',
            patterns: [new RegExp('^Z[0-9]{16}$')],
            tracking_url: (trackNum: string) => `https://www.colisprive.com/moncolis/pages/detailColis.aspx?numColis=${trackNum}`
        },

        /**
         * Starts with H and ends with 19 numeric digits (H1000730000824301047)
         */
        hermes: {
            code: 'hermes',
            patterns: [new RegExp('^H[0-9]{19}$')],
            tracking_url: (trackNum: string) => `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation/#${trackNum}`
        },

    }

    getCouriers(trackNum: string) {
        const couriers = Object.keys(this.couriers);
        const matches = couriers.filter(courier => {
            return this.couriers[courier].patterns.filter(pattern => {
                const match = pattern.test(trackNum);
                return match;
            }).length > 0
        });
        return matches;
    }

    getCourier(trackNum: string) {
        const couriers = this.getCouriers(trackNum);
        return couriers[0];
    }

    isCourier(trackNum: string, courier: string) {
        courier = courier.toLowerCase();
        const courierObj = this.getCouriers(trackNum)
        return courierObj.indexOf(courier) > -1;
    }

    getTrackingUrl(trackNum: string, courier: string) {
        courier = courier.toLowerCase();
        return courier
        ? this.couriers[courier] && this.couriers[courier].tracking_url(trackNum)
        : this.couriers[this.getCouriers(trackNum)[0]].tracking_url(trackNum);
    }

    injectPatterns(courier: string, patt: RegExp | string) {
        courier = courier.toLowerCase();
        return !courier || !this.couriers[courier]
            ? false
            : this.couriers[courier]
            .patterns
            .push(new RegExp(patt));
    }

    isKnown(trackNum: string) {
        const courierObj = this.getCouriers(trackNum);
        return courierObj.length > 0;
    }
}