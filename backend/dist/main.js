"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const config_1 = require("./config");
const mongoose = require("mongoose");
const conf = config_1.default();
const assetsDir = path_1.resolve(conf.frontend.assetsDir);
const viewsDir = path_1.resolve(conf.frontend.viewsDir);
async function bootstrap() {
    const nestOptions = {
        bodyParser: false,
    };
    const mongooseConnection = await mongoose.connect(conf.mongodb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule.forRoot(conf.NestShopifyModuleOptions, mongooseConnection, passport), nestOptions);
    app.enableCors({
        origin: '*',
    });
    app.use(cookieParser());
    app.set('trust proxy', 1);
    const session = expressSession(conf.session);
    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());
    app.setViewEngine('pug');
    app.useStaticAssets(assetsDir);
    app.setBaseViewsDir(viewsDir);
    await app.listen(conf.app.port);
    console.log(`Start app on https://${conf.app.host}:${conf.app.port}`);
    console.log(`Debug mode is: "${process.env.DEBUG}"`);
}
bootstrap();
//# sourceMappingURL=main.js.map