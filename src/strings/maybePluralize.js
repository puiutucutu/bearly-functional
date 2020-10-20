/**
 * @param {boolean} condition
 * @return {function(word: string): string}
 * @example
 *
 * maybePluralize(xs.length > 1)("result"); //=> "results"
 *
 * `${[].length} ${maybePluralize([].length > 1)("result")} found.`; //=> "0 result found"
 * `${["a"].length} ${maybePluralize(["a"].length > 1)("result")} found.`; //=> "1 result found"
 * `${["a","b"].length} ${maybePluralize(["a","b"].length > 1)("result")} found.`; //=> "2 results found"
 *
 */
export const maybePluralize = (condition) => (word) => {
  return condition ? `${word}s` : word;
};
