/**
 * showEither :: String -> String -> String
 *
 * @param {String} fallback
 * @return {function(x: String): String} The `fallback` will always be returned
 *   when an empty string or non-string values are supplied for `x`.
 *
 * @example
 * showEither("n/a")("blue"); //=> "blue"
 * showEither("n/a")("");     //=> "n/a"
 * showEither("n/a")(" ");    //=> " "
 * showEither("n/a")(null);   //=> "n/a"
 * showEither("n/a")(false);  //=> "n/a"
 * showEither("n/a")(0);      //=> "n/a"
 *
 */
const showEither = fallback => x => (!!x ? x : fallback);

export { showEither };
