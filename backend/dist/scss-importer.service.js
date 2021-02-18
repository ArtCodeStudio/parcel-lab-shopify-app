"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const getModuleFilePath = (urlParts) => {
    let fullModuleUrl = '';
    try {
        fullModuleUrl = require.resolve(urlParts.relativeModuleUrl);
    }
    catch (error) {
        try {
            urlParts.scssFileName = '_' + urlParts.scssFileName;
            urlParts.relativeModuleUrl = path_1.join(urlParts.moduleName, ...urlParts.parts, urlParts.scssFileName);
            fullModuleUrl = require.resolve(urlParts.relativeModuleUrl);
        }
        catch (_) {
            throw error;
        }
    }
    return fullModuleUrl;
};
const getUrlParts = (url, firstIsModule = true) => {
    const urlParts = url.split('/');
    let moduleName = null;
    if (firstIsModule) {
        if (urlParts[0].startsWith('~')) {
            urlParts[0] = urlParts[0].substring(1);
        }
        moduleName = urlParts.shift();
    }
    let scssFileName = urlParts.pop();
    if (!scssFileName.endsWith('.scss')) {
        scssFileName = scssFileName + '.scss';
    }
    const relativeModuleUrl = path_1.join(moduleName, ...urlParts, scssFileName);
    return {
        relativeModuleUrl,
        scssFileName,
        moduleName,
        parts: urlParts,
    };
};
const importer = (url, prev, done) => {
    if (url.startsWith('~')) {
        const urlParts = getUrlParts(url);
        const fullModuleUrl = getModuleFilePath(urlParts);
        return fs_1.readFile(fullModuleUrl, 'utf8', function (err, data) {
            if (err) {
                return done(err);
            }
            done({ file: url, contents: data });
        });
    }
    else if (prev.startsWith('~')) {
        const prevDir = path_1.dirname(prev);
        const newUrl = path_1.join(prevDir, url);
        const urlParts = getUrlParts(newUrl);
        const fullModuleUrl = getModuleFilePath(urlParts);
        return fs_1.readFile(fullModuleUrl, 'utf8', function (err, data) {
            if (err) {
                return done(err);
            }
            done({ file: newUrl, contents: data });
        });
    }
    else {
        return done({ file: url });
    }
};
exports.default = importer;
//# sourceMappingURL=scss-importer.service.js.map