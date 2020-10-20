import S from "sanctuary";
import { upperCase } from "./upperCase";
import { head, tail } from '../list'
import { split } from './split'

/**
 * @param {String} x
 * @return {String}
 */
const capitalize = x => S.joinWith("") ([
  ...upperCase (head (split (x))),
  ...tail (split (x))
]);

export { capitalize };
