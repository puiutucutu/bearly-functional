import { isObject } from "../conditions/isObject.js";
import { keys } from "./keys.js";

export const length = (x) => {
  if (Array.isArray(x)) return x.length;
  if (isObject(x)) return keys(x).length;
  throw new Error(
    `expected \`x\` to be of type \`array\` or \`object\`, instead received \`${typeof x}\``
  );
};
