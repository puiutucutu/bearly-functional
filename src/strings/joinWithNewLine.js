import S from "sanctuary";

/**
 * @param {String[]} xs
 * @return {String}
 */
const joinWithNewLine = xs => S.joinWith ("\n") (xs);

export { joinWithNewLine };
