/**
 * @param {number} figures
 * @return {function(target: String): String} False when the target cannot be
 *   parsed, otherwise the string representation of the number rounded to
 *   significant figures.
 */
export const toSignificantFigures = (figures) => (x) =>
  Number.isNaN(parseFloat(x))
    ? false
    : parseFloat(x).toFixed(figures)
  ;
