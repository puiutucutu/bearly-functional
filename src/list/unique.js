import { includes } from "./includes"
import { reduce } from "./reduce"

export const uniqueByComposition = xs =>
  reduce
  (uniques => x => (includes (x) (uniques) ? uniques : [...uniques, x]))
  ([])
  (xs)
;

/**
 * @param {array} xs A 1d array of primitives.
 * @return {any[]}
 * @example
 *
 * unique([]); //=> []
 * unique([1,1,2,3]); //=> [1,2,3]
 * unique(["a","b","b","c"]); //=> ["a","b","c"]
 */
export const unique = (xs) => [...new Set(xs)];
