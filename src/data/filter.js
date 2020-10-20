/**
 * @param {function} predicate
 * @return {function(xs: array): array}
 */
export const filter = predicate => xs => Array.prototype.filter.bind(xs)(predicate);
