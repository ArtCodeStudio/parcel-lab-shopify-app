import _ = require('underscore');

/**
 * Creates a new object with only the keys in arrayOfKeys
 * @param obj Object to be copied
 * @param allowedKeys Keys to be copy
 * @return The new object only with the allowed keys
 */
export const copyObjOfKeys = (obj: any, allowedKeys: string[]): any => {
  const newObj: any = {};

  const keys = _.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (_.contains(allowedKeys, keys[i])) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }

  return newObj;
};
