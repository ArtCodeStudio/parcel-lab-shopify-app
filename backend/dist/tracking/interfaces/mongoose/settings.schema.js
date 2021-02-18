"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelLabSettingsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ParcelLabSettingsSchema = new mongoose_1.Schema({
    user: { type: Number, required: true },
    token: {
        type: String,
        trim: true,
        required: true,
        minlength: 30,
    },
    shop_domain: {
        type: String,
        trim: true,
        index: true,
        required: true,
        unique: true
    },
    prefer_checkout_shipping_method: Boolean,
    fallback_detect_carrier_by_tracking_more: Boolean,
    tracking_more_token: String,
});
//# sourceMappingURL=settings.schema.js.map