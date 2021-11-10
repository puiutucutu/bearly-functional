/**
 * @param {string} key
 * @return {function(obj: Object): boolean}
 */
export const hasKey = (key) => (obj) =>
  Object.prototype.hasOwnProperty.call(obj, key);
