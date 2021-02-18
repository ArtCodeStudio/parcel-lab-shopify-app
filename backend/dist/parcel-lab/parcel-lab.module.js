"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ParcelLabModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelLabModule = void 0;
const common_1 = require("@nestjs/common");
const nest_shopify_1 = require("nest-shopify");
const tracking_service_1 = require("./tracking/tracking.service");
const settings_controller_1 = require("./settings/settings.controller");
const settings_service_1 = require("./settings/settings.service");
const settings_model_provider_1 = require("./settings/settings.model.provider");
const tracking_controller_1 = require("./tracking/tracking.controller");
let ParcelLabModule = ParcelLabModule_1 = class ParcelLabModule {
    static forRoot(options, database, passport) {
        return {
            module: ParcelLabModule_1,
            imports: [nest_shopify_1.ShopifyModule.forRoot(options, database, passport)],
        };
    }
    configure(consumer) {
        consumer.apply(nest_shopify_1.BodyParserJsonMiddleware).forRoutes(settings_controller_1.SettingsController);
    }
};
ParcelLabModule = ParcelLabModule_1 = __decorate([
    common_1.Module({
        providers: [
            tracking_service_1.ParcelLabTrackingService,
            settings_service_1.SettingsService,
            settings_model_provider_1.ParcelLabSettingsModelProvider,
        ],
        controllers: [settings_controller_1.SettingsController, tracking_controller_1.TrackingController],
    })
], ParcelLabModule);
exports.ParcelLabModule = ParcelLabModule;
//# sourceMappingURL=parcel-lab.module.js.map