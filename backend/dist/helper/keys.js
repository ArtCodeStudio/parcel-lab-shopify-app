"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyObjOfKeys = void 0;
const _ = require("underscore");
const copyObjOfKeys = (obj, allowedKeys) => {
    const newObj = {};
    const keys = _.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (_.contains(allowedKeys, keys[i])) {
            newObj[keys[i]] = obj[keys[i]];
        }
    }
    return newObj;
};
exports.copyObjOfKeys = copyObjOfKeys;
//# sourceMappingURL=keys.js.map