import S from "sanctuary";

/**
 * Breaks apart a string into its array of substrings wherever the ASCII 32
 * `SPACE` character is found.
 *
 * splitSpace :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitSpace ("foo bar baz"); //=> ["foo", "bar", "baz"]
 * splitSpace ("hello   world"); //=> ["hello", "", "", "world"]
 * splitSpace (""); //=> [""]
 *
 */
const splitSpace = S.splitOn(" ");

export { splitSpace };
