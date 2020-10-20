import { is } from "../conditions";
import { filter } from "./filter";

/**
 * Removes elements of the array that evaluate to false when coerced to Boolean.
 *
 * filterFalse :: [*] -> [*]
 *
 * @param {[]} xs
 * @return {[]}
 */
export const filterFalse = xs => filter (is) (xs);
