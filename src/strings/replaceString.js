import S from "sanctuary";

/**
 * A curried wrapper around the native `string.replace` function. Function is
 * extracted from the sanctuary.js docs.
 *
 * Does not truncate whitespace.
 *
 * replaceString :: (String -> (String -> String)) -> String
 *
 * @see {https://sanctuary.js.org/#curry3}
 * @see {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
 * @example
 *
 * replaceString ("bar") ("") ("foo bar baz"); //=> "foo  bar" (note the double space)
 * replaceString (/a/gi) ("") ("foo bar baz"); //=> "foo br bz"
 *
 */
const replaceString = S.curry3(function(replace, replacer, replacee) {
  return String.prototype.replace.call(replacee, replace, replacer);
});

export { replaceString };
