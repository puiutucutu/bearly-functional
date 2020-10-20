import { prototype } from "../utils";

/**
 * @param {*} x
 * @return {boolean}
 */
export const isObject = (x) =>
  (typeof x === "object" && x !== null) || prototype(x) === PROTOTYPES.OBJECT;
