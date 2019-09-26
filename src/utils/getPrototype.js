/**
 * @param {*} x
 * @return {String}
 * @example
 *
 * getPrototype(7); //=> `"[object Number]"`
 *
 */
const getPrototype = x => Object.prototype.toString.call(x);

export { getPrototype };
