/**
 * @param {String} x
 * @return {String}
 * @example
 *
 * replaceNonNumericChars("a1-b2-c3"); //=> "1-2-3"
 */
export const replaceNonNumericDashChars = (x) => x.replace(/[^\d-]/g, "");
