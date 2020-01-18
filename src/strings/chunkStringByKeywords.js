import { chunkStringByIndices } from "./chunkStringByIndices.js";
import { findKeywords } from "./findKeywords.js";
import { makeRangesBetween } from "../list";
import { splitSpace } from "./splitSpace.js";

/**
 * Breaks apart a string where keywords are found.
 *
 * @param {string} s
 * @param {string[]} keywords
 * @return {Object.<string, TextFragment[]>[]}
 * @example
 *
 * const text = "The quick brown dog jumped over the fox, but why did the dog not bark?";
 * const actual = chunkStringByKeywords(text, ["brown", "dog"]);
 *
 * const expected = [
 *   { segment: ["The", "quick"], keyword: false },
 *   { segment: ["brown"], keyword: true },
 *   { segment: [], keyword: false },
 *   { segment: ["dog"], keyword: true },
 *   {
 *     segment: ["jumped", "over", "the", "fox,", "but", "why", "did", "the"],
 *     keyword: false
 *   },
 *   { segment: ["dog"], keyword: true },
 *   { segment: ["not", "bark?"], keyword: false }
 * ];
 *
 */
export function chunkStringByKeywords(s, keywords) {
  const ss = splitSpace(s);
  const matchedKeywordsIndices = findKeywords(s, keywords);

  // all the keyword indices in the exploded string, sorted ascendingly
  const mergedKeywordIndices = Object.entries(matchedKeywordsIndices)
    .reduce((acc, [k, v]) => [...acc, ...v], [])
    .sort((a, b) => a - b);

  // iterate through indices, extract words before and after, concat as
  // necessary, and return an array of text fragments representing a string
  // split on keywords
  const stringSplitIndexGroups = makeRangesBetween([0, ...mergedKeywordIndices, ss.length]); // prettier-ignore

  return chunkStringByIndices(s, stringSplitIndexGroups);
}
