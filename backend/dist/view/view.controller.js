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
exports.ViewController = void 0;
const common_1 = require("@nestjs/common");
const view_service_1 = require("./view.service");
let ViewController = class ViewController {
    constructor(viewService) {
        this.viewService = viewService;
    }
    extractShopDomain(req) {
        let shop;
        if (req.query && req.query.shop) {
            shop = req.query.shop;
        }
        if (req.shop) {
            shop = req.shop;
        }
        if (req.session.latestShop) {
            shop = req.shop;
        }
        if (req.user && req.user.shop && req.user.shop.myshopify_domain) {
            shop = req.user.shop.myshopify_domain;
        }
        return shop;
    }
    install(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.install(shop);
    }
    terms(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.terms(shop);
    }
    privacy(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.privacy(shop);
    }
    app(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.app(shop);
    }
    settings(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.settings(shop);
    }
    plan(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.plan(shop);
    }
    orders(req) {
        const shop = this.extractShopDomain(req);
        return this.viewService.orders(shop);
    }
    close() {
        return {};
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('install'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "install", null);
__decorate([
    common_1.Get('/terms'),
    common_1.Render('terms'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "terms", null);
__decorate([
    common_1.Get('/privacy'),
    common_1.Render('privacy'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "privacy", null);
__decorate([
    common_1.Get('/view'),
    common_1.Render('pages/app'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "app", null);
__decorate([
    common_1.Get('/view/settings'),
    common_1.Render('pages/settings'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "settings", null);
__decorate([
    common_1.Get('/view/plan'),
    common_1.Render('pages/plan'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "plan", null);
__decorate([
    common_1.Get('/view/orders'),
    common_1.Render('pages/orders'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViewController.prototype, "orders", null);
__decorate([
    common_1.Get('/view/close'),
    common_1.Render('pages/close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ViewController.prototype, "close", null);
ViewController = __decorate([
    common_1.Controller(''),
    __metadata("design:paramtypes", [view_service_1.ViewService])
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=view.controller.js.map