/**
 * @param {string[]} strings
 * @return {Object} Where each key is a unique string and each key value is the
 *   frequency of string.
 */
function countUniqueStrings(strings) {
  return strings.reduce((acc, x) => {
    acc[x] = x in acc ? acc[x] + 1 : 1;
    return acc;
  }, {});
}

export { countUniqueStrings }
