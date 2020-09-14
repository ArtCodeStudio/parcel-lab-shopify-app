import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AppModule } from './app.module';
import { join } from 'path';
import * as sassMiddleware from 'node-sass-middleware';
import * as expressSession from 'express-session';
// import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import { NestShopifyModuleOptions, ConfigService } from './config.service';
// import { RedisSessionIoAdapter } from './adapter/redis-session-io.adapter';

import * as mongoose from 'mongoose';

const assetsDir = join(__dirname, '..', 'public');
const viewsDir = join(__dirname, '..', 'frontend/views');
const stylesSrc = join(__dirname, '..', 'frontend/styles');
const stylesDest = join(assetsDir, 'styles');

async function bootstrap() {

  const nestOptions: NestApplicationOptions = {
    // disable global body parser in Nest application
    bodyParser: false,
  };

  const mongooseConnection: typeof mongoose = await mongoose.connect(NestShopifyModuleOptions.mongodb.url);

  // const expressServer = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(
      NestShopifyModuleOptions,
      mongooseConnection,
      passport,
    ),
    // expressServer,
    nestOptions,
  );

  app.enableCors({
    origin: '*', // TODO get all allowed domains from database and change this on runtime if a new shop is installed if possible?
  });

  /**
   * Init express sesion
   */
  const session = expressSession(ConfigService.session);
 
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

  // const redisIoAdapter = new RedisSessionIoAdapter(session, app);
  // app.useWebSocketAdapter(redisIoAdapter);

  // passport session
  app.use(passport.initialize());
  app.use(passport.session());

  app.setViewEngine('pug');

  /**
   * Another built-in adapter is a WsAdapter which in turn acts like a proxy between the framework
   * and integrate blazing fast and thoroughly tested ws library.
   * This adapter is fully compatible with native browser WebSockets and is far faster than socket.io package.
   * Unluckily, it has significantly fewer functionalities available out-of-the-box.
   * In some cases, you may just don't necesserily need them though.
   * @see https://docs.nestjs.com/websockets/adapter
   */
  // app.useWebSocketAdapter(new WsAdapter(app));

  app.use(sassMiddleware({
    /* Options */
    src: stylesSrc,
    dest: stylesDest,
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/styles', // Where prefix is at <link rel="stylesheets" href="styles/app.css"/>
  }));
  app.useStaticAssets(assetsDir);
  app.setBaseViewsDir(viewsDir);

  await app.listen(ConfigService.app.port);

  // see https://docs.nestjs.com/techniques/hot-reload
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
