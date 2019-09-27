import { isTruthy } from "../conditions/isTruthy";

/**
 * Removes elements of the array that evaluate to false when coerced to Boolean.
 *
 * filterFalse :: [*] -> [*]
 *
 * @return {Array}
 */
const filterFalse = xs => Array.prototype.filter.call(xs, isTruthy);

export { filterFalse };
