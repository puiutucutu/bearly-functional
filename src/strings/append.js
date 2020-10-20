/**
 * @param {String} appendWith
 * @return {function(target: String): String}
 * @example append ("Hello ") ("world"); //=> "Hello world"
 */
export const append = (appendWith) => (appendee) => `${appendWith}${appendee}`;
