import { PROTOTYPES, prototype } from "../utils";

/**
 * @param {string} x
 * @return {boolean}
 */
export const isString = x => prototype (x) === PROTOTYPES.STRING;
