/**
 * @param {T} x
 * @return {string}
 * @example castNullToNullString(null); //=> "null"
 */
export const castNullToNullString = (x) => (x === null ? "null" : x);
