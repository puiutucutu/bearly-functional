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
 * splitCommaRegex ("foo,bar,baz"); //=> ["foo", "bar", "baz"]
 * splitCommaRegex ("foo, bar, baz"); //=> ["foo", " bar", " baz"]
 * splitCommaRegex (""); //=> [""]
 *
 */
const splitCommaRegex = S.splitOnRegex(/,/g);

export { splitCommaRegex };
