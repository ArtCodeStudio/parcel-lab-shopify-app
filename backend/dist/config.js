"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const cache_manager_ioredis_1 = require("cache-manager-ioredis");
const ioredis_1 = require("ioredis");
const expressSession = require("express-session");
const connectRedis = require("connect-redis");
const findRoot = require("find-root");
const path_1 = require("path");
dotenv.config();
const redis = {
    url: process.env.REDIS_URL,
};
const RedisStore = connectRedis(expressSession);
const sync = {
    enabled: false,
    autoSyncResources: [],
};
const app = {
    root: findRoot(process.cwd()),
    protocol: `https`,
    host: process.env.HOST,
    port: Number(process.env.PORT),
    debug: Boolean(process.env.DEBUG),
    test: process.env.NODE_ENV === 'test' || process.env.TEST === 'true',
    environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
};
const FRONTEND_PATH = path_1.dirname(require.resolve('@parcel-lab-shopify-app/frontend'));
const frontend = {
    path: FRONTEND_PATH,
    assetsDir: path_1.resolve(FRONTEND_PATH, 'dist'),
    viewsDir: path_1.resolve(FRONTEND_PATH, 'views'),
};
const session = {
    store: new RedisStore({
        client: new ioredis_1.default(redis.url, { keyPrefix: app.host }),
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000,
        secure: true,
        sameSite: 'none',
    },
};
const cache = {
    store: cache_manager_ioredis_1.default,
    redisInstance: new ioredis_1.default(redis.url, { keyPrefix: app.host }),
    ttl: 60,
    max: 100,
};
const shopify = {
    clientID: process.env.SHOPIFY_CLIENT_ID,
    clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
    callbackURL: `${app.protocol}://${app.host}/shopify/auth/callback`,
    iframeCallbackURL: `${app.protocol}://${app.host}/shopify/auth/callback/iframe`,
    scope: [
        'read_orders',
        'read_products',
        'read_draft_orders',
        'read_shipping',
        'read_customers',
        'read_fulfillments',
    ],
    webhooks: {
        autoSubscribe: [
            'draft_orders/create',
            'draft_orders/update',
            'fulfillments/create',
            'fulfillments/update',
            'fulfillment_events/create',
            'fulfillment_events/delete',
            'orders/cancelled',
            'orders/create',
            'orders/fulfilled',
            'orders/paid',
            'orders/partially_fulfilled',
            'orders/updated',
            'orders/delete',
            'order_transactions/create',
        ],
    },
};
const charges = {
    plans: [
        {
            name: 'Default',
            price: 5.0,
            test: app.environment === 'development',
            trial_days: 14,
            return_url: `${app.protocol}://${app.host}/shopify/charge/activate`,
            visible: true,
        },
        {
            name: 'Customers',
            price: 3.0,
            test: app.environment === 'development',
            trial_days: 0,
            return_url: `${app.protocol}://${app.host}/shopify/charge/activate`,
            visible: false,
        },
    ],
    frontend_return_url: `${app.protocol}://${app.host}/view/settings`,
};
const mongodb = {
    url: process.env.MONGODB_URL,
};
const parcelLab = {
    user: process.env.PARCELLAB_USER,
    token: process.env.PARCELLAB_TOKEN,
};
const NestShopifyModuleOptions = {
    app,
    sync,
    shopify,
    charges,
    redis,
    mongodb,
    cache,
};
exports.default = () => ({
    NestShopifyModuleOptions,
    mongodb,
    charges,
    shopify,
    redis,
    cache,
    session,
    app,
    frontend,
    parcelLab,
});
//# sourceMappingURL=config.js.map