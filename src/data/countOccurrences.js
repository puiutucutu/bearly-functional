/**
 * @param {string[]} xs 1d array of strings.
 * @return {Object} Where each key is a unique string and each key value is the
 *   occurrence frequency of string. Sorting by frequency is not performed.
 * @see https://stackoverflow.com/a/56929965/1727232
 * @example
 *
 * const xs = ["apple", "orange", "banana", "apple", , "banana", "apple"];
 * console.log(countOccurrences(xs)); //=> {apple: 3, orange: 1, banana: 2}
 */
function countOccurrences(xs) {
  return xs.reduce((acc, x) => ((acc[x] = ++acc[x] || 1), acc), {});
}

export { countOccurrences };
