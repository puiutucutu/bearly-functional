import S from "sanctuary";

/**
 * @param {String[]} xs
 * @return {String}
 */
const joinWithComma = xs => S.joinWith (",") (xs);

export { joinWithComma };
