/**
 * showEither :: String -> String -> String
 *
 * @param {string} fallback
 * @return {function(x: string): string}
 * @example
 *
 * // ex. 1
 * showEither("n/a")(""); //=> "n/a"
 *
 * // ex. 2
 * const personName = "John";
 * showEither("n/a")(!!personName ? `# ${personName}` : null); //=> "John"
 *
 * // ex. 3
 * const personWeight = 80.55
 * showEither("n/a")(appendText(" kg")(toSignificantFigures(0)(personWeight))); //=> "80 kg"
 */
export const showEither = (fallback) => (x) => (!!x ? x : fallback);
