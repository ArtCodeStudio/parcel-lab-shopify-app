import { ViewService } from './view.service';
export declare class ViewController {
    private readonly viewService;
    constructor(viewService: ViewService);
    private extractShopDomain;
    install(req: any): any;
    terms(req: any): any;
    privacy(req: any): any;
    app(req: any): any;
    settings(req: any): any;
    plan(req: any): any;
    orders(req: any): any;
    close(): any;
}
