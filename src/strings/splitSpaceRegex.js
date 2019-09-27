import S from "sanctuary";

/**
 * Breaks apart a string into its array of substrings wherever the ASCII 32
 * `SPACE` character is found.
 *
 * splitSpaceRegex :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitSpaceRegex ("foo bar baz"); //=> ["foo", "bar", "baz"]
 * splitSpaceRegex ("hello   world"); //=> ["hello", "", "", "world"]
 * splitSpaceRegex (""); //=> [""]
 *
 */
const splitSpaceRegex = S.splitOnRegex (/ /g);

export { splitSpaceRegex };
