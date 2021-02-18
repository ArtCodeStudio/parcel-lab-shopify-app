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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const nest_shopify_1 = require("nest-shopify");
const tracking_service_1 = require("./tracking.service");
let TrackingController = class TrackingController {
    constructor(tracking) {
        this.tracking = tracking;
    }
    get(res, session, search, page, size) {
        console.debug('GET parcel-lab/settings', session.currentShop, search, page, size);
        this.tracking
            .list(session.currentShop, search, page, size)
            .then((list) => {
            return res.jsonp(list);
        })
            .catch((error) => {
            return res
                .status(error.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failure on list parcel-lab trackings for shop domain ${session.currentShop} ${error.message}`,
            });
        });
    }
};
__decorate([
    common_1.Get('list'),
    nest_shopify_1.Roles('shopify-staff-member'),
    __param(0, common_1.Res()),
    __param(1, common_1.Session()),
    __param(2, common_1.Query('search')),
    __param(3, common_1.Query('page')),
    __param(4, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number, Number]),
    __metadata("design:returntype", void 0)
], TrackingController.prototype, "get", null);
TrackingController = __decorate([
    common_1.Controller('parcel-lab/tracking'),
    __metadata("design:paramtypes", [tracking_service_1.ParcelLabTrackingService])
], TrackingController);
exports.TrackingController = TrackingController;
//# sourceMappingURL=tracking.controller.js.map