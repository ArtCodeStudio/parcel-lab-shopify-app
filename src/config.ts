/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Custom config file
 * @see https://docs.nestjs.com/techniques/configuration#custom-configuration-files
 */
import * as dotenv from 'dotenv';
import redisCacheStore from 'cache-manager-ioredis';
import Redis from 'ioredis';
import * as expressSession from 'express-session';
import * as connectRedis from 'connect-redis';
import { ConfigApp, ConfigShopify, ConfigCharges, ConfigCache, ConfigRedis, ConfigMongoDB, ShopifyModuleOptions  } from 'nest-shopify';
import findRoot = require("find-root");

dotenv.config();

const redis: ConfigRedis = {
  url: process.env.REDIS_URL
};

const RedisStore = connectRedis(expressSession);
const redisInstance = new Redis(redis.url);

const app: ConfigApp = {
  root: findRoot(process.cwd()),
  protocol: `https`,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  debug: Boolean(process.env.DEBUG),
  environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
};

/**
 * Options for express-session
 * @see https://github.com/expressjs/session
 */
const session = {
  store: new RedisStore({
    client: redisInstance
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}

/**
 * Cache manager options
 * @see https://github.com/BryanDonovan/node-cache-manager
 */
const cache: ConfigCache = {
  store: redisCacheStore as any,
  redisInstance: redisInstance,
  ttl: 60, // app.environment === 'production' ? 300 : 60, // second
  max: 100,
}

const shopify: ConfigShopify = {
  /** client id / Api key */
  clientID: process.env.SHOPIFY_CLIENT_ID,
  /**  shared secret / client Secret / API secret key */
  clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
  /** callback url / redirect url */
  callbackURL: `${app.protocol}://${app.host}/shopify/auth/callback`,
  /** callback url used in shopify iframe */
  iframeCallbackURL: `${app.protocol}://${app.host}/shopify/auth/callback/iframe`,
  scope: ['read_orders', 'read_shipping', 'read_customers', 'read_fulfillments'],
  webhooks: {
    autoSubscribe: [
      // 'carts/create',
      // 'carts/update',
      // 'checkouts/create',
      // 'checkouts/update',
      // 'checkouts/delete',
      // 'collections/create',
      // 'collections/update',
      // 'collections/delete',
      // 'collection_listings/add',
      // 'collection_listings/remove',
      // 'collection_listings/update',
      // 'customers/create',
      // 'customers/disable',
      // 'customers/enable',
      // 'customers/update',
      // 'customers/delete',
      // 'customer_groups/create',
      // 'customer_groups/update',
      // 'customer_groups/delete',
      'draft_orders/create',
      'draft_orders/update',
      'fulfillments/create',
      'fulfillments/update',
      'fulfillment_events/create',
      'fulfillment_events/delete',
      // 'inventory_items/create',
      // 'inventory_items/update',
      // 'inventory_items/delete',
      // 'inventory_levels/connect',
      // 'inventory_levels/update',
      // 'inventory_levels/disconnect',
      // 'locations/create',
      // 'locations/update',
      // 'locations/delete',
      'orders/cancelled',
      'orders/create',
      'orders/fulfilled',
      'orders/paid',
      'orders/partially_fulfilled',
      'orders/updated',
      'orders/delete',
      'order_transactions/create',
      // 'products/create',
      // 'products/update',
      // 'products/delete',
      // 'product_listings/add',
      // 'product_listings/remove',
      // 'product_listings/update',
      // 'refunds/create',
      // 'app/uninstalled',
      // 'shop/update',
      // 'themes/create',
      // 'themes/publish',
      // 'themes/update',
      // 'themes/delete',
    ],
  },
};

const charges: ConfigCharges = {
  plans: [
    {
      // The default charge
      name: 'Default',
      price: 29.00,
      test: app.environment === 'development',
      trial_days: 14,
      return_url: `${app.protocol}://${app.host}/shopify/charge/activate`,
      visible: true,
    },
    {
      // Charge for special customers with a cheaper price
      name: 'Customers',
      price: 19.00,
      test: app.environment === 'development',   // Marks this charge as a test, meaning it won't charge the shop owner.
      trial_days: 0, // Don't charge the user for 0 days
      return_url: `${app.protocol}://${app.host}/shopify/charge/activate`,
      visible: false, // Not visible to everyone
    },
  ],
  // Return url after the charge was activated (or not)
  frontend_return_url: `${app.protocol}://${app.host}/view/settings`,
};

const mongodb: ConfigMongoDB = {
  url: process.env.MONGODB_URL,
};

const NestShopifyModuleOptions: ShopifyModuleOptions = {
  app,
  shopify,
  charges,
  redis,
  mongodb,
  cache,
}

export default () => ({
  NestShopifyModuleOptions,
  mongodb,
  charges,
  shopify,
  redis,
  cache,
  session,
  app,
});