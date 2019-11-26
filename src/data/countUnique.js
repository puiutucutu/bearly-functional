/**
 * @param {string[]} strings
 * @return {Object} Where each key is a unique string and each key value is the
 *   frequency of string.
 * @example
 *
 * countUniqueStrings(["a","c","c","a","b","d","e"]); //=> {a: 2, c: 2, b: 1, d: 1, e: 1}
 */
function countUniqueStrings(strings) {
  return strings.reduce((acc, x) => {
    acc[x] = x in acc ? acc[x] + 1 : 1;
    return acc;
  }, {});
}

export { countUniqueStrings }
