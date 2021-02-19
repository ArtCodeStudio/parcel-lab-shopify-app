"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const nest_shopify_1 = require("nest-shopify");
const settings_service_1 = require("../settings/settings.service");
let SettingsController = class SettingsController {
    constructor(settings) {
        this.settings = settings;
        this.log = new nest_shopify_1.DebugService('parcelLab:SettingsController');
    }
    get(res, session) {
        this.log.debug('GET parcel-lab/settings', session.currentShop);
        return this.settings
            .findByShopDomain(session.currentShop)
            .then((settings) => {
            return res.json(settings);
        })
            .catch((error) => {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failure on get parcel-lab settings for shop domain ${session.currentShop} ${error.message}`,
            });
        });
    }
    set(res, session, settings) {
        this.log.debug('POST parcel-lab/settings', session.currentShop, settings);
        return this.settings
            .createOrUpdate(Object.assign(Object.assign({}, settings), { shop_domain: session.currentShop }))
            .then((settings) => res.json(settings))
            .catch((error) => {
            this.log.error(error);
            const statusCode = error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            return res.status(statusCode).json({
                message: `Failure on set parcel-lab settings for shop domain ${session.currentShop}`,
            });
        });
    }
    delete(res, session, settings) {
        this.log.debug('Delete parcel-lab/settings', session.currentShop, settings);
        return this.settings
            .delete(session.currentShop)
            .then((deleteResult) => res.json(deleteResult))
            .catch((error) => {
            this.log.error(error);
            const statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            return res.status(statusCode).json({
                message: `Failure on delete parcel-lab settings for shop domain ${session.currentShop}`,
            });
        });
    }
};
__decorate([
    common_1.Get(),
    nest_shopify_1.Roles('shopify-staff-member'),
    __param(0, common_1.Res()), __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "get", null);
__decorate([
    common_1.Post(),
    nest_shopify_1.Roles('shopify-staff-member'),
    __param(0, common_1.Res()),
    __param(1, common_1.Session()),
    __param(2, common_1.Body('settings')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "set", null);
__decorate([
    common_1.Delete(),
    nest_shopify_1.Roles('shopify-staff-member'),
    __param(0, common_1.Res()),
    __param(1, common_1.Session()),
    __param(2, common_1.Body('settings')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "delete", null);
SettingsController = __decorate([
    common_1.Controller('parcel-lab/settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map