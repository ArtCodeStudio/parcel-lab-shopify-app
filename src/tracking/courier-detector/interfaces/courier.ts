export interface Courier {
    code: string;
    patterns: RegExp[];
    tracking_url: (trackNum: string) => string;
}