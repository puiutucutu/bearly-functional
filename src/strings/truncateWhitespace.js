import { replaceString } from "./replaceString";

/**
 * Truncates all whitespace chars to a single space char.
 *
 * truncateWhitespace :: String -> String
 *
 * @return {String}
 * @see {@link https://stackoverflow.com/a/1279874/1727232}
 * @example
 *
 * truncateWhitespace ("hello   world"); //=> "hello world"
 * truncateWhitespace ("foo \t \v bar"); //=> "foo bar"
 */
const truncateWhitespace = replaceString (/\s+/g) (" ");

export { truncateWhitespace };
