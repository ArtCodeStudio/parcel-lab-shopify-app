import * as connectRedis from 'connect-redis';
import { ConfigApp, ConfigShopify, ConfigCharges, ConfigCache, ConfigRedis, ConfigMongoDB, ShopifyModuleOptions } from 'nest-shopify';
declare const _default: () => {
    NestShopifyModuleOptions: ShopifyModuleOptions;
    mongodb: ConfigMongoDB;
    charges: ConfigCharges;
    shopify: ConfigShopify;
    redis: ConfigRedis;
    cache: ConfigCache;
    session: {
        store: connectRedis.RedisStore;
        secret: string;
        resave: boolean;
        saveUninitialized: boolean;
        proxy: boolean;
        cookie: {
            maxAge: number;
            secure: boolean;
            sameSite: boolean | "strict" | "lax" | "none";
        };
    };
    app: ConfigApp;
    frontend: {
        path: string;
        assetsDir: string;
        viewsDir: string;
    };
    parcelLab: {
        user: string;
        token: string;
    };
};
export default _default;
