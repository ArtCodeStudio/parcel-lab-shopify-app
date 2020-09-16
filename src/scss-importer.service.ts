import { AsyncImporter, SyncImporter, Importer } from 'node-sass';
import { join, dirname } from 'path';
import { readFile } from "fs";

export interface UrlParts {
  relativeModuleUrl: string;
  scssFileName: string;
  moduleName: null | string;
  parts: string[];
}

const getModuleFilePath = (urlParts: UrlParts) => {
  let fullModuleUrl = '';
  try {
    fullModuleUrl = require.resolve(urlParts.relativeModuleUrl);
  } catch (error) {
    try {
      // If file was not found try to get the scss file starting with "_"
      urlParts.scssFileName = '_' + urlParts.scssFileName;
      urlParts.relativeModuleUrl = join(urlParts.moduleName, ...urlParts.parts, urlParts.scssFileName);
      fullModuleUrl = require.resolve(urlParts.relativeModuleUrl);
    } catch (_) {
      throw error;
    }
  }
  return fullModuleUrl;
}

const getUrlParts = (url: string, firstIsModule = true): UrlParts => {
  const urlParts = url.split('/');
  let moduleName: string | null = null;
  if (firstIsModule) {
    // Remove the first '~'
    if (urlParts[0].startsWith('~')) {
      urlParts[0] = urlParts[0].substring(1);
    }
    moduleName = urlParts.shift();
  }
  let scssFileName = urlParts.pop();
  if (!scssFileName.endsWith('.scss')) {
    scssFileName = scssFileName + '.scss';
  }
  const relativeModuleUrl = join(moduleName, ...urlParts, scssFileName);
  return {
    relativeModuleUrl,
    scssFileName,
    moduleName,
    parts: urlParts,
  }
}

/**
 * TODO move this to the nest theme module
 * Search for scss file in node_modues / yarn's virtual filesystem (pnp)
 * @see https://github.com/sass/node-sass#importer--v200---experimental
 *
 * @param url is the path in import as is, which LibSass encountered.
 * @param prev is the previously resolved path.
 * @param done is an optional callback, either consume it or return value synchronously.
 */
const importer: AsyncImporter | SyncImporter | Importer [] = (url, prev, done) => {
    if (url.startsWith('~')) {
      const urlParts = getUrlParts(url);
      const fullModuleUrl = getModuleFilePath(urlParts);
      return readFile(fullModuleUrl, 'utf8', function (err, data) {
        if(err) {
          return done(err);
        }
        done({file: url, contents: data});
      });
    } else if(prev.startsWith('~')) {
      // Append the prev module path to the url
      const prevDir = dirname(prev);
      const newUrl = join(prevDir, url);
      const urlParts = getUrlParts(newUrl);
      const fullModuleUrl = getModuleFilePath(urlParts);
      return readFile(fullModuleUrl, 'utf8', function (err, data) {
        if(err) {
          return done(err);
        }
        done({file: newUrl, contents: data});
      });
    } else {
      return done({file: url});
    }
}

export default importer;