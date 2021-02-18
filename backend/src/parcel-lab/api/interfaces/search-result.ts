export interface ParcellabSearchChannelApi {
  /** e.g. `"api-ip-172-31-3-88"` */
  server: string;
  /** e.g. `"2020-10-01T12:16:36.711Z"` */
  timestamp: string;
}

export interface ParcellabSearchResult {
  id: string;
  /** Tracking number */
  tn: string;
  co: {
    /** e.g. `"dhl-express`" */
    n: string;
    /** e.g. `"DHL-EXPRESS`" */
    p: string;
    /** e.g. `"#12204F`" */
    pri: string;
    /** e.g. `"#FFFFFF`" */
    sec: string;
  };
  tr: {
    is: boolean;
  };
  inf: {
    /** e.g. `"paul ffff"` */
    rcp: string;
    /** e.g. `"paul ffff"` */
    rcn: string;
    /** e.g. `"paul.emue@gmail.com"` */
    eml: string;
    pho: string;
    /** e.g. `"Hauptstr. 4-6"` */
    str: string;
    /** e.g. `"68259"` */
    zip: string;
    /** e.g. `"Mannheim"` */
    cty: string;
    /** Country */
    ctry: {
      /** e.g. `"DEU"` */
      n: string;
      /** e.g. `"Germany"` */
      p: string;
    };
    /** Order number e.g. `"1261"` */
    orn: string;
    /** e.g. `"2819750363180"` */
    dln: string;
    /** e.g. `"3779028025388"` */
    cun: string;
    imprtsrc: {
      channels: {
        api: ParcellabSearchChannelApi[];
        file: [];
        email: [];
      };
      /** e.g. `"2020-10-01T12:16:36.725Z"` */
      first_update: string;
      /** e.g. `"2020-10-01T12:16:37.109Z"` */
      last_update: string;
      /** e.g. `4` */
      number_of_updates: number;
    };
    /** e.g. `"nowhere"` */
    srvc: string;
    pod: boolean;
  };
  oth: {
    /** Client e.g. the shop name */
    cli: string;
  };
  cre: {
    /** e.g. `"2020-10-01T12:16:36.723Z"` */
    dat: string;
    /** e.g. `"a few seconds ago"` */
    ago: string;
  };
  lst: {
    /** e.g. `"2020-10-01T12:16:36.723Z"` */
    dat: string;
    /** e.g. `"a few seconds ago"` */
    ago: string;
    sta: {
      /** e.g. `"OrderProcessed"` */
      code: string;
      /** e.g. `"Order processed"` */
      status: string;
      /** e.g. `"The order has been processed."` */
      status_details: string;
    };
  };
  /** e.g. `{}` */
  rep: any; // TODO
}

export interface ParcellabSearchResponse {
  meta: {
    hits: number;
    searchTime: number;
    assemblyTime: number;
    formatTime: number;
  };
  results: ParcellabSearchResult[];
}
