import S from "sanctuary";
import { EOL } from "os";

/**
 * @param {String[]} xs
 * @return {String}
 */
const joinWithNewLine = xs => S.joinWith (EOL) (xs);

export { joinWithNewLine };
