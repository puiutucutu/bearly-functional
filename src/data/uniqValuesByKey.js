import S from "sanctuary";
import { dictByKey } from "./dictByKey";

const keys = Object.keys;

/**
 * @param {String} key
 * @return {function(xs: T[]): String[]}
 * @example
 *
 * const persons = [
 *   { id: 1, name: "John" },
 *   { id: 2, name: "James" },
 *   { id: 3, name: "Jack" },
 *   { id: 4, name: "James" },
 *   { id: 5, name: "Jack" },
 *   { id: 6, name: "James" },
 * ];
 *
 * uniqValuesByKey ("name") (persons); //=> ["John", "James", "Jack"]
 *
 */
const uniqValuesByKey = key => S.pipe([
  dictByKey(key),
  keys
]);

export { uniqValuesByKey };
