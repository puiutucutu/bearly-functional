import { is } from "./is";

/**
 * isNot :: * -> Boolean
 *
 * @param {*} x
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
export const isNot = x => is (x) === false;
