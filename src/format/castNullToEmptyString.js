/**
 * @param {T} x
 * @return {string}
 * @example castNullToEmptyString(null); //=> ""
 */
export const castNullToEmptyString = (x) => (x === null ? "" : x);
