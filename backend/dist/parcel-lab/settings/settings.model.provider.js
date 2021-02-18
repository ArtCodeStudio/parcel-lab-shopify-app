"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelLabSettingsModelProvider = void 0;
const settings_schema_1 = require("../interfaces/mongoose/settings.schema");
exports.ParcelLabSettingsModelProvider = {
    provide: 'ParcelLabSettingsModel',
    useFactory: (connection) => connection.model('parcel_lab_settings', settings_schema_1.ParcelLabSettingsSchema),
    inject: ['defaultDatabase'],
};
//# sourceMappingURL=settings.model.provider.js.map