import { ShopifyAuthService, ConfigApp } from 'nest-shopify';
import { ConfigService } from '@nestjs/config';
export declare class ViewService {
    private configService;
    private readonly shopifyAuthService;
    constructor(configService: ConfigService, shopifyAuthService: ShopifyAuthService);
    getGlobalViewVars(shop: string, method: any): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    terms(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    install(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    privacy(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    app(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    settings(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    plan(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    orders(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    apiShopify(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
    apiWebhooks(shop: string): Promise<{
        app: ConfigApp;
        shopify: {
            shop: string;
            apiKey: string;
            redirectUri: string;
        };
        dataset: {
            debug: boolean;
            environment: string;
            namespace: any;
            title: string;
        };
        page: {
            title: string;
        };
    } & {
        dataset: {
            title: string;
        };
        page: {
            title: string;
        };
    }>;
}
