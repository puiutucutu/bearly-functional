import { get, keys } from "../object";
import { includes } from "../list";

/**
 * @param {Object} dict An object of <k,v> items
 * @return {function(k: string): string} Function expecting a key to
 *   lookup in the dict.
 *
 * @example
 *
 * const dict = { GL: "Gold", SI: "Silver" };
 *
 * define (dict) ("GL"); //=> "Gold"
 * define (dict) ("CL"); //=> "CL"
 */
export const define = dict => k => includes (k) (keys (dict)) ? get (k) (dict) : k;
