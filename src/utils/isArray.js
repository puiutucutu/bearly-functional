import { getPrototype } from "./getPrototype";

/**
 * @param {Array} xs
 * @return {Boolean}
 * @example
 *
 * isArray([1,2,3]); //=> true
 */
const isArray = xs => {
  if (Array.hasOwnProperty("isArray")) {
    return Array.isArray(xs);
  } else {
    return getPrototype(xs) === "[object Array]";
  }
};

export { isArray };
