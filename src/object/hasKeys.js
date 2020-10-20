import { keys } from "./keys.js";

/**
 * @param {object} obj
 * @return {boolean}
 */
export const hasKeys = (obj) => !!keys(obj).length;
