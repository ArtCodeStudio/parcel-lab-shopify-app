// type definition for https://github.com/egg-/delivery-tracker
// TODO currently this npm module is not used
declare module 'delivery-tracker' {
    
    type Status = 'InfoReceived' | 'Pending' | 'InTransit' | 'Delivered' | 'Exception' | 'FailAttempt';
    type CheckpointFn = (hash: string) => { url: string; method: 'GET'};
    type ErrorCode = -1 | 20 | 21 | 10 | 11 | 12 | 13 | 30;
    type ErrorMessage = 'required apikey.' | 'shipment does not support.' |  'working on it. Please search it again.' | 'invalid trace number.';

    interface Checkpoint {
        /** courier information */
        courier: Courier;
        /** Location info of the checkpoint provided by the courier. */
        location: string;
        /** Checkpoint message */
        message: string;
        /**
         * The date and time of the checkpoint provided by the courier. The values can be:
         * Empty string,
         * YYYY-MM-DD,
         * YYYY-MM-DDTHH:mm:ss
         * YYYY-MM-DDTHH:mm:ss+Timezone
         */
        time: string;
    }

    interface Response {
        courier: Courier;
        number: string;
        status: Status;
        checkpoints: Checkpoint[];
    }

    interface TrackingInfo {
        cookie?: {
            url: string;
            method: 'GET' | 'POST'
        }
        data?: any;
        detail?: (token: string) => {
            url: string;
            method: 'GET' | 'POST'
            body: string;
            headers: string[];
        }
        trace: (num: string, cb: (error: Error, result: Response) => void) => void
    }

    interface Error {
        code: ErrorCode;
        message: ErrorMessage;
    }

    interface Courier {
        /** Unique code of courier. */
        CODE: string;
        /** Courier name */
        NAME: string;
    }

    interface Tracker {
        error: (code?: ErrorCode) => Error;
        courier: (slug: string, opts: any) => Courier;
        normalizeStatus: (checkpoints: CheckpointFn) => Status;
    }


    const tracker: Tracker;
    export default tracker;
  }
  