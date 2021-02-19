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
        required: true,
        unique: true,
    },
    customFields: {
        'no-notify': {
            type: Boolean,
            required: false,
            unique: false,
        },
    },
});
//# sourceMappingURL=settings.schema.js.map