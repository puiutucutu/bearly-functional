import S from "sanctuary";

/**
 * Breaks apart a string into its array of substrings wherever whitespace
 * characters are found.
 *
 * This corresponds to all whitespace characters represented by the `\s`
 * metacharacter in regex.
 * - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
 *
 * splitWhitespace :: String -> [String]
 *
 * @return {String}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
 * @see All examples from @{splitSpace} and @{splitSpaceRegex} work in
 *   addition to all the remaining forms of whitespace characters.
 *
 * @example
 *
 * splitWhitespace ("hello \t world"); //=> "hello", "", "", "world"
 *
 */
const splitWhitespace = S.splitOnRegex(/\s/g);

export { splitWhitespace };
