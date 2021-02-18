import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AppModule } from './app.module';
import { resolve } from 'path';
// import * as sassMiddleware from 'node-sass-middleware';
import * as expressSession from 'express-session';
// import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import config from './config';
import * as mongoose from 'mongoose';
// import { SessionIoAdapter } from 'nest-shopify';

const conf = config();
const assetsDir = resolve(conf.frontend.assetsDir);
const viewsDir = resolve(conf.frontend.viewsDir);

async function bootstrap() {
  const nestOptions: NestApplicationOptions = {
    // disable global body parser in Nest application
    bodyParser: false,
  };

  const mongooseConnection: typeof mongoose = await mongoose.connect(
    conf.mongodb.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );

  // const expressServer = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(
      conf.NestShopifyModuleOptions,
      mongooseConnection,
      passport,
    ),
    // expressServer,
    nestOptions,
  );

  app.enableCors({
    origin: '*', // TODO get all allowed domains from database and change this on runtime if a new shop is installed if possible?
  });

  app.use(cookieParser());

  /**
   * Needed if this app is behind a proxy with secure cookies
   * TODO checkme on digital ocean app
   * @see https://github.com/expressjs/session#cookiesecure
   */
  app.set('trust proxy', 1); // trust first proxy

  /**
   * Init express sesion
   */
  const session = expressSession(conf.session);

  /**
   * Set express sesion
   */
  app.use(session);

  /**
   * Use socket.io with redis and session for socket.io
   * By running socket.io with the socket.io-redis adapter you can
   * run multiple socket.io instances in different processes
   * or servers that can all broadcast and emit events to and from each other.
   * @see https://github.com/socketio/socket.io-redis
   */
  // const redisIoAdapter = new RedisSessionIoAdapter(session, conf.redis.url, conf.app.host, app);
  // app.useWebSocketAdapter(redisIoAdapter);

  /**
   * Another built-in adapter is a WsAdapter which in turn acts like a proxy between the framework
   * and integrate blazing fast and thoroughly tested ws library.
   * This adapter is fully compatible with native browser WebSockets and is far faster than socket.io package.
   * Unluckily, it has significantly fewer functionalities available out-of-the-box.
   * In some cases, you may just don't necesserily need them though.
   * @see https://docs.nestjs.com/websockets/adapter
   */
  // app.useWebSocketAdapter(new WsAdapter(app));

  /**
   * Use socket.io with session for socket.io (without redis)
   * @see https://docs.nestjs.com/websockets/adapter
   */
  // const ioAdapter = new SessionIoAdapter(session, conf.app.host, app);
  // app.useWebSocketAdapter(ioAdapter);

  // passport session
  app.use(passport.initialize());
  app.use(passport.session());

  app.setViewEngine('pug');

  app.useStaticAssets(assetsDir);
  app.setBaseViewsDir(viewsDir);

  await app.listen(conf.app.port);

  console.log(`Start app on https://${conf.app.host}:${conf.app.port}`);
  console.log(`Debug mode is: "${process.env.DEBUG}"`);

  // see https://docs.nestjs.com/techniques/hot-reload
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
