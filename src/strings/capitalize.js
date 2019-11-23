import S from "sanctuary";
import { uppercase } from "./uppercase";
import { head, tail } from '../list'
import { split } from './split'

/**
 * @param {String} x
 * @return {String}
 */
const capitalize = x => S.joinWith("") ([
  ...uppercase (head (split (x))),
  ...tail (split (x))
]);

export { capitalize };
