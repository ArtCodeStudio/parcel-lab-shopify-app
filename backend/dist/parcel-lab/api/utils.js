"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmptyValues = exports.objHasOnlyKeys = exports.objHasKeys = void 0;
const _ = require("underscore");
const objHasKeys = (obj, arrayOfKeys) => {
    let result = true;
    for (let i = 0; i < arrayOfKeys.length; i++) {
        if (!obj[arrayOfKeys[i]]) {
            result = false;
        }
    }
    return result;
};
exports.objHasKeys = objHasKeys;
const objHasOnlyKeys = (obj, arrayOfKeys) => {
    let result = true;
    const keys = _.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (!_.contains(arrayOfKeys, keys[i])) {
            result = false;
        }
    }
    return result;
};
exports.objHasOnlyKeys = objHasOnlyKeys;
const deleteEmptyValues = (data) => {
    for (const key in data) {
        if (typeof data[key] === 'undefined') {
            delete data[key];
        }
        if (typeof data[key] === 'string' && data[key].length <= 0) {
            delete data[key];
        }
        if (data[key] === null) {
            delete data[key];
        }
        if (typeof data[key] === 'object') {
            data[key] = exports.deleteEmptyValues(data[key]);
        }
    }
    return data;
};
exports.deleteEmptyValues = deleteEmptyValues;
//# sourceMappingURL=utils.js.map