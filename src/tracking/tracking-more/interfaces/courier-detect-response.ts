export interface TrackingMoreCourierDetectResponse {
    meta: {
        code: number; // 200
        type: string; // "Success",
        message: string; // "Success"
    },
    data: {
        name: string; // "China post",
        code: string; // "china-post"
    }[]
}