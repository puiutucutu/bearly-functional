/**
 * @param {String} x
 * @return {String}
 */
const upperCase = x => String.prototype.toUpperCase.call(x);

export { upperCase };
