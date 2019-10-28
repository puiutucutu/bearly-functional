/**
 * @param {T[]} x
 * @return {function(xs: T[]): T[]}
 */
const concat = x => xs => Array.prototype.concat(xs, x);

export { concat };
