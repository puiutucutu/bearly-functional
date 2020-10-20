/**
 * @param {String} x
 * @return {String}
 * @example
 *
 * replaceNonNumericChars("a1b2c3"); //=> "123"
 */
export const replaceNonNumericChars = (x) => x.replace(/[^\d]/g, "");
