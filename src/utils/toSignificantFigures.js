/**
 * @param figures
 * @return {function(target: String): String} False when the target cannot be
 *   parsed, otherwise the string representation of the number rounded to
 *   significant figures.
 * @example
 * toSignificantFigures (2) ("abc"); //=> false
 * toSignificantFigures (2) (100.999); //=> "100.99"
 */
const toSignificantFigures = figures => target =>
  Number.isNaN(parseFloat(target))
    ? false
    : parseFloat(target).toFixed(figures)
  ;

export { toSignificantFigures };
