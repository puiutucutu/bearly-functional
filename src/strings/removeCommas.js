import { replaceString } from "./replaceString";

/**
 * @param {String} x
 * @return {String}
 * @example
 *
 * removeCommas("hello,world"); //=> "helloworld"
 * removeCommas("hello, world"); //=> "hello world"
 * removeCommas("a,b,c"); //=> abc
 *
 */
const removeCommas = x => replaceString (/,/g) ("") (x);

export { removeCommas };
