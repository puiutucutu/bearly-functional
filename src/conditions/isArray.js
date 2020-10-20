import { prototype } from "../utils/prototype";

/**
 * @param {Array} xs
 * @return {Boolean}
 * @example
 *
 * isArray(1); //=> false
 * isArray([1,2,3]); //=> true
 */
const isArray = (xs) => Array.hasOwnProperty("isArray")
  ? Array.isArray(xs)
  : prototype(xs) === "[object Array]"
;

export { isArray };
