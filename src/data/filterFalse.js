import S from "sanctuary";
import { empty } from "../conditions";

/**
 * filterFalse :: [a] -> [a]
 *
 * @param {*[]} xs
 * @return {*[]}
 */
const filterFalse = xs => S.filter (empty) (xs);

export { filterFalse };
