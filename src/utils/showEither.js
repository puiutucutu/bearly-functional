/**
 * showEither :: String -> String -> String
 *
 * @param {string} fallback
 * @return {function(x: string): string} The `fallback` will always be returned
 *   when an empty string or non-string values are supplied for `x`.
 *
 * @example
 *
 * // ex. 1
 * showEither("n/a")("blue"); //=> "blue"
 * showEither("n/a")(" ");    //=> " "
 * showEither("n/a")("");     //=> "n/a"
 * showEither("n/a")(null);   //=> "n/a"
 * showEither("n/a")(false);  //=> "n/a"
 * showEither("n/a")(0);      //=> "n/a"
 *
 * // ex. 2
 * const personName = "John";
 * showEither("n/a")(!!personName ? `Hello ${personName}` : null); //=> "Hello John"
 *
 * // ex. 3
 * showEither("n/a")(appendText(" kg")(toSignificantFigures(0)(80.55))); //=> "80 kg"
 *
 */
export const showEither = fallback => x => !!x ? x : fallback;
