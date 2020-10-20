/**
 * splitOn :: string -> string -> string[]
 *
 * @param {string} delimiter
 * @return {function(x: string): string[]}
 * @example
 *
 * splits(";")("hello;world"); //=> ["hello", "world"]
 * splits(";")("hello;world;"); //=> ["hello", "world", ""]
 */
export const splitOn = (delimiter) => (x) => {
  return String.prototype.split.call(x, delimiter);
};
