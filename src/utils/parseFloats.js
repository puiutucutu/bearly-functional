/**
 * @param {String[]} xs
 * @return {Number[]}
 *
 * @example
 *
 * const parsedFloats = parseFloats(["-79.8620667737253", "43.52457849715662"]);
 *
 * console.log(parsedFloats); //=> [-79.8620667737253, 43.52457849715662]
 *
 */
const parseFloats = xs => xs.map(x => parseFloat(x));

export { parseFloats };
