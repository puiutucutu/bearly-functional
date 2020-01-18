import { splitSpace } from "./splitSpace.js";

/**
 * Splits the string into an array and finds the indices where the
 * keyword is found using a wildcard search on the end of the keyword.
 *
 * @param {string} s
 * @param {string} keyword
 * @return {number[]} An array containing the array indices (if any) of where
 *   each keyword was after splitting the string into words.
 *
 * @example
 *
 * findKeyword("The quick brown fox jumps over the lazy dog", "the"); //=> [0,6]
 *
 */
export function findKeyword(s, keyword) {
  const ss = splitSpace(s);
  const regex = new RegExp(`(${keyword}[\\w]*)`, "mig"); //=> /(person[\w]*)/mig
  return ss.reduce(
    (acc, curr, k) => (regex.test(curr) ? [...acc, k] : acc),
    []
  );
}
