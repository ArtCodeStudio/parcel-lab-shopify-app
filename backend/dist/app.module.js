"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const view_controller_1 = require("./view/view.controller");
const view_service_1 = require("./view/view.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const nest_shopify_1 = require("nest-shopify");
const parcel_lab_module_1 = require("./parcel-lab/parcel-lab.module");
let AppModule = AppModule_1 = class AppModule {
    static forRoot(options, database, passport) {
        return {
            module: AppModule_1,
            imports: [
                common_1.CacheModule.register(options.cache),
                nest_shopify_1.ShopifyModule.forRoot(options, database, passport),
                parcel_lab_module_1.ParcelLabModule.forRoot(options, database, passport),
            ],
        };
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [config_2.default],
            }),
            typeorm_1.TypeOrmModule.forRoot(),
        ],
        controllers: [view_controller_1.ViewController],
        providers: [view_service_1.ViewService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map