/**
 * showEither :: String -> String -> String
 *
 * @param {String} fallback
 * @return {function(x: String): String}
 *
 * @example
 * showEither("n/a")("blue"); //=> "blue"
 * showEither("n/a")(null);   //=> "n/a"
 * showEither("n/a")(false);  //=> "n/a"
 * showEither("n/a")(0);      //=> "n/a"
 *
 */
const showEither = fallback => x => (!!x ? x : fallback);

export { showEither };
