import { isFalse } from "../conditions/isFalse";

/**
 * Removes elements of the array that evaluate to false.
 *
 * filterFalse :: [*] -> [*]
 *
 * @return {Array}
 */
const filterFalse = xs => Array.prototype.filter.call(xs, isFalse);

export { filterFalse };
