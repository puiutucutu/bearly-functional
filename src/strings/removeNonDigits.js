/**
 * removeNonDigits :: String -> String
 *
 * @param {string} x
 * @return {string}
 *
 * @example removeNonDigits ("foo123bar"); //=> 123
 */
export const removeNonDigits = (x) => x.replace(/\D/g, "");
