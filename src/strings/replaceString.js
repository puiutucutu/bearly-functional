import { curryThree } from "../list"

/**
 * A curried wrapper around the native `string.replace` function. Function is
 * extracted from the sanctuary.js docs.
 *
 * Does not truncate whitespace.
 *
 * replaceString :: (String -> (String -> String)) -> String
 *
 * @see {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
 *
 * @example
 *
 * replaceString ("bar") ("") ("foo bar baz"); //=> "foo  bar" (note the double space)
 * replaceString (/a/gi) ("") ("foo bar baz"); //=> "foo br bz"
 *
 */
const replaceString = curryThree(function(searchValue, replace, replacee) {
  return String.prototype.replace.call(replacee, searchValue, replace);
});

export { replaceString };
