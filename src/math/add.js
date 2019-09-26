/**
 * Adds two numbers together.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Number} The sum of adding two numbers.
 */
function add(x, y) {
  if (
    Object.prototype.toString.call(x) !== "[object Number]" ||
    Object.prototype.toString.call(y) !== "[object Number]"
  ) {
    throw new TypeError("Supplied arg `x` or `y` is not a valid number");
  }

  // try out ES6 features to see transpiled output
  const a = new Promise((resolve, reject) => resolve());
  const b = new Map();
  const values = new Set([x, y]);

  return [...values].reduce((acc, value) => acc + value, 0);
}

export { add };
