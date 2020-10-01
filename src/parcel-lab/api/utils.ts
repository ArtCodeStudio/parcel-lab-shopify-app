/**
 * Based on https://bitbucket.org/parcellab/sdk-node/src/master/utils.js
 */

import _ = require('underscore');

/////////////
// objects //
/////////////

/**
 * checks if object has at least all of the keys in the array, but maybe even more
 * @param obj Object to be checked
 * @param arrayOfKeys Keys to be checked for existence
 * @return true if object has all the keys of the array
 */
export const objHasKeys = (obj: any, arrayOfKeys: string[]): boolean => {

  let result = true;

  for (let i = 0; i < arrayOfKeys.length; i++) {
    if (!obj.hasOwnProperty(arrayOfKeys[i])) {
      result = false;
    }
  }

  return result;
};

/**
 * checks if object has only key in the array, but not necessarily all of them
 * @param obj Object to be checked
 * @param arrayOfKeys Keys to be checked
 * @return true if object has only keys contained in the array
 */
export const objHasOnlyKeys = (obj: any, arrayOfKeys: string[]): boolean => {

  let result = true;

  const keys = _.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (!_.contains(arrayOfKeys, keys[i])) {
      result = false;
    }
  }

  return result;

};

export const deleteEmptyValues = (data: any) => {
  for (const key in data) {
    if(typeof(data[key]) === 'undefined') {
      delete data[key];
    }
    if(typeof(data[key]) === 'string' && data[key].length <= 0) {
      delete data[key];
    }
    if(data[key] === null) {
      delete data[key];
    }
    if(typeof(data[key]) === 'object') {
      data[key] = deleteEmptyValues(data[key]);
    }
  }
  return data;
}