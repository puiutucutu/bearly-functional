/**
 * @param {*} x
 * @return {function(array): boolean}
 */
const includes = (x) => (xs) => Array.prototype.includes.call(
  xs,
  x
);

export { includes };
