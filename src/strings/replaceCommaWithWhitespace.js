import S from "sanctuary";

import { replaceString } from "./replaceString";
import { truncateSpace } from "./truncateSpace";

/**
 * Replaces all occurrences of commas with a single space ensuring to truncate
 * two or more resulting adjacent spaces to a single space.
 *
 * In practice, this means that a comma at the beginning or the end of a
 * string will be replaced with a whitespace but will not be trimmed.
 *
 * replaceCommaWithWhitespace :: String -> String
 *
 * @type {*|*[]}
 * @example
 *
 * replaceCommaWithWhitespace("hello,,, world"); //=> "hello world"
 * replaceCommaWithWhitespace(",hello, world"); //=> " hello world"
 * replaceCommaWithWhitespace("hello, world,"); //=> "hello world "
 * replaceCommaWithWhitespace(",hello,world,"); //=> " hello world "
 *
 */
const replaceCommaWithWhitespace = S.pipe([
  replaceString(/,/g)(" "),
  truncateSpace
]);

export { replaceCommaWithWhitespace };
