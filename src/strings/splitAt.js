/**
 * splitAt :: Number -> [A] -> [A]
 *
 * @param {number} k
 * @return {function(array): [[], []]}
 * @example
 *
 * splitAt (2) (["a","b","c","d","e"]); //=> [["a","b"],["c","d","e"]]
 *
 */
const splitAt = (k) => (xs) => [
  xs.slice(0, k),
  xs.slice(k)
];

export { splitAt };
