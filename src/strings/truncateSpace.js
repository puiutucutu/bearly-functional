import { replaceString } from "./replaceString";

/**
 * Truncates contiguous ASCII 32 `SPACE` chars into one.
 *
 * truncateSpace :: String -> String
 *
 * @return {String}
 * @see {@link https://stackoverflow.com/a/7151225/1727232}
 * @see {@link https://stackoverflow.com/a/1279878/1727232}
 * @example truncateSpace ("hello   world"); //=> "hello world"
 */
const truncateSpace = replaceString (/ {2,}/g) (" ");

export { truncateSpace };
