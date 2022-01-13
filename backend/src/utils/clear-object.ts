/** Removes undefined properties */
export const clearObject = <T = object>(obj: T): T => {
  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined || obj[key] === 'undefined') {
      delete obj[key];
    }
  }
  return obj;
};
