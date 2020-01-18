import { findKeyword } from "./findKeyword.js";

/**
 * Given a string, will perform a wildcard search on the exploded string for
 * each supplied keyword and return an array of index positions found for each
 * keyword.
 *
 * Searching is case insensitive.
 *
 * @param {string} s
 * @param {string[]} keywords
 * @return {Object.<string, number[]>} An object containing the keyword and an
 *   array of numbers representing the index positions of the supplied string
 *   exploded on whitespace.
 *
 * @example
 *
 * const s = "The quick brown fox jumps over the lazy dog";
 * findKeywords(s, ["the","dog"]); //=> { "the": [0,6], "dog": [8] }
 *
 */
export function findKeywords(s, keywords) {
  return keywords.reduce(
    (acc, keyword) => ({ ...acc, [keyword]: findKeyword(s, keyword) }),
    {}
  );
}
