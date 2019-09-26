import S from "sanctuary";

/**
 * @param {String} x
 * @return {String}
 */
const removeCommas = x => replaceString (/,/g) ("") (x);

export { removeCommas}
