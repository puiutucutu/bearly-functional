import S from 'sanctuary'

/**
 * Breaks apart a string into an array of substrings wherever newline
 * chars are found - these are `\r\n` and `\n`.
 *
 * splitComma :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitNewLines ("hello \n world"); //=> ["hello ", " world"]
 * splitNewLines ("hello \r\n world"); //=> ["hello ", " world"]
 * splitNewLines ("hello \n \n \n world"); //=> ["hello ", " ", " ", " world"]
 * splitNewLines (""); //=> [""]
 *
 */
const splitNewLines = S.splitOnRegex (/\r\n|\n/g);

export { splitNewLines }
