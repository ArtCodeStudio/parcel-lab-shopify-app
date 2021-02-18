export interface ParcellabSearchChannelApi {
    server: string;
    timestamp: string;
}
export interface ParcellabSearchResult {
    id: string;
    tn: string;
    co: {
        n: string;
        p: string;
        pri: string;
        sec: string;
    };
    tr: {
        is: boolean;
    };
    inf: {
        rcp: string;
        rcn: string;
        eml: string;
        pho: string;
        str: string;
        zip: string;
        cty: string;
        ctry: {
            n: string;
            p: string;
        };
        orn: string;
        dln: string;
        cun: string;
        imprtsrc: {
            channels: {
                api: ParcellabSearchChannelApi[];
                file: [];
                email: [];
            };
            first_update: string;
            last_update: string;
            number_of_updates: number;
        };
        srvc: string;
        pod: boolean;
    };
    oth: {
        cli: string;
    };
    cre: {
        dat: string;
        ago: string;
    };
    lst: {
        dat: string;
        ago: string;
        sta: {
            code: string;
            status: string;
            status_details: string;
        };
    };
    rep: any;
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
