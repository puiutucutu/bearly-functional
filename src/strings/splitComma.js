import S from "sanctuary";

/**
 * Returns array of substrings resulting from splitting the original string
 * wherever a comma was found.
 *
 * splitComma :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitComma ("foo,bar,baz"); //=> ["foo", "bar", "baz"]
 * splitComma ("foo, bar, baz"); //=> ["foo", " bar", " baz"]
 * splitComma (""); //=> [""]
 *
 */
const splitComma = S.splitOn (","); // String -> [String]

export { splitComma };
