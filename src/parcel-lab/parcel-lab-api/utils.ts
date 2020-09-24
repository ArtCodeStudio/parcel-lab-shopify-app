/**
 * Based on https://bitbucket.org/parcellab/sdk-node/src/master/utils.js
 */

import _ = require('underscore');

/////////////
// objects //
/////////////

/**
 * checks if object has at least all of the keys in the array, but maybe even more
 * @param  {Object} obj         Object to be checked
 * @param  {[String]} arrayOfKeys Keys to be checked for existence
 * @return {Boolean}             true if object has all the keys of the array
 */
export const objHasKeys = function objHasKeys(obj, arrayOfKeys) {

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
 * @param  {Object} obj         Object to be checked
 * @param  {[String]} arrayOfKeys Keys to be checked
 * @return {Boolean}             true if object has only keys contained in the array
 */
export const objHasOnlyKeys = function objHasOnlyKeys(obj, arrayOfKeys) {

  let result = true;

  const keys = _.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (!_.contains(arrayOfKeys, keys[i])) {
      result = false;
    }
  }

  return result;

};

////////////
// arrays //
////////////

/**
 * appends an array to another array
 * @param  {[]} other_array array to append
 */
// Array.prototype.extend = function(other_array) {

//   if (_.isArray(other_array)) {
//     other_array.forEach(function(v) {
//       this.push(v);
//     }, this);
//   }

// };
