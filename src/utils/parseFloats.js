import { map } from "../list";

/**
 * @param {String[]} xs
 * @return {Number[]}
 *
 * @example
 *
 * const parsedFloats = parseFloats(["-79.8620667737253", "43.52457849715662"]);
 * //=> [-79.8620667737253, 43.52457849715662]
 *
 */
export const parseFloats = map (parseFloat);
