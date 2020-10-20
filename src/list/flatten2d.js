/**
 * @param {T[]} xs An array of primitive-laden arrays.
 * @return {T[]} The arrays merged into one.
 * @example
 *
 * flatten2d([[1,2,3], [4,5,6]]); //=> [1,2,3,4,5,6]
 *
 */
const flatten2d = (xs) =>
  xs.reduce((acc, x) => (Array.isArray(x) ? [...acc, ...x] : [...acc, x]), []);

export { flatten2d };
