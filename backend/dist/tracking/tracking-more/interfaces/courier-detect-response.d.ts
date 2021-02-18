export interface TrackingMoreCourierDetectResponse {
    meta: {
        code: number;
        type: string;
        message: string;
    };
    data: {
        name: string;
        code: string;
    }[];
}
