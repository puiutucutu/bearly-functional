/**
 * @param {string} key
 * @return {function(obj: Object): boolean}
 */
export const keyExists = (key) => (obj) =>
  Object.prototype.hasOwnProperty.call(obj, key);
