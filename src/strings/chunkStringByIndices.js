import { splitSpace } from "./splitSpace.js";

/**
 * @param {string} s
 * @param {number[][]} indices An array of 2-tuple numbers like `[[0,3], [3,21], [21,41], [41,136]]`
 * @return {string[]}
 * @example
 *
 * const str = "The quick brown fox jumps over the lazy dog";
 * const actual = chunkStringByIndices(str, [[0,3],[3,6]]);
 *
 * const expected = [
 *   { segment: ["The", "quick", "brown"], keyword: false },
 *   { segment: ["fox"], keyword: true },
 *   { segment: ["jumps", "over"], keyword: false }
 * ];
 *
 * const actual2 = chunkStringByIndices(str, [[0,3],[3,6],[6,9]]);
 *
 * const expected2 = [
 *   { segment: ["The", "quick", "brown"], keyword: false },
 *   { segment: ["fox"], keyword: true },
 *   { segment: ["jumps", "over"], keyword: false },
 *   { segment: ["the"], keyword: true },
 *   { segment: ["lazy", "dog"], keyword: false }
 * ];
 *
 */
export function chunkStringByIndices(s, indices) {
  const ss = splitSpace(s);
  const segments = [];
  for (let i = 0; i < indices.length; i++) {
    const prev = indices[i - 1];
    const curr = indices[i];
    const next = indices[i + 1];

    // first
    if (prev === undefined) {
      const [from, to] = curr;
      segments.push({ segment: ss.slice(from, to), keyword: false });
      segments.push({ segment: ss.slice(to, to + 1), keyword: true });
    }

    // in the middle
    if (!!prev && !!next) {
      const [from, to] = curr;
      segments.push({ segment: ss.slice(from + 1, to), keyword: false });
      segments.push({ segment: ss.slice(to, to + 1), keyword: true });
    }

    // last
    if (next === undefined) {
      const [from, to] = curr;
      segments.push({ segment: ss.slice(from + 1, to), keyword: false });
    }
  }

  return segments;
}
