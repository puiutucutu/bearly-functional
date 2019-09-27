import { isTruthy } from "./isTruthy";

/**
 * isFalsy :: * -> Boolean
 *
 * @return {Boolean}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 * @see @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
const isFalsy = x => isTruthy(x) === false;

export { isFalsy };
