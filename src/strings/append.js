import { getPrototype } from "../utils";

/**
 * @param {String} text
 * @return {function(target: String): String}
 * @example
 * append ("Hello ") ("world"); //=> "Hello world"
 */
const append = text => target => {
  if (getPrototype(target) === "[object String]") {
    return `${target}${text}`;
  }
};

export { append };
