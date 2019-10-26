/**
 * @param {Array} xs
 * @return {Boolean}
 * @example
 *
 * isArray([1,2,3]); //=> true
 */
import { getPrototype } from "./getPrototype";

const isArray = xs =>
  Array.hasOwnProperty("isArray")
    ? Array.isArray(xs)
    : getPrototype(xs) === "[object Array]"
  ;

export { isArray };
