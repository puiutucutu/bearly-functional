/**
 * @param {number[]} positions An array of numbers where each number in the
 *   array should be greater than the previous number.
 * @return {number[][]}
 *
 * @example
 *
 * makeRangesBetween([0]); //=> [[0,0]]
 * makeRangesBetween([3,21,41,136]); //=> [[0,3], [3,21], [21,41], [41,136]]
 * makeRangesBetween([0,-22,3,5,-7,136]); //=> [[0,-22], [-22,3], [3,5], [5,-7], [-7,136]]
 */
export function makeRangesBetween(positions) {
  const out = [];
  for (let i = 0; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const next = positions[i + 1];

    // handles cases when only one index value provided like
    // `makeRangesBetween([0])`
    if (prev === undefined && next === undefined) {
      out.push([curr, curr]);
      continue;
    }

    if (prev === undefined) {
      out.push([curr, next]);
      continue;
    }

    if (next === undefined) {
      break;
    }

    out.push([curr, next]);
  }

  return out;
}
