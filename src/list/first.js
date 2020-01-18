/**
 * @param {T[]} xs
 * @return {T|undefined}
 * @example
 *
 * const xs = ["a", "b", "c"];
 *
 * first([]); //=> undefined
 *
 * first(xs); //=> "a"
 *
 * delete xs[0];
 * first(xs); //=> "b"
 *
 * delete xs[1];
 * first(xs); //=> "c""
 *
 * delete xs[2];
 * first(xs); //=> undefined
 *
 */
const first = xs => xs.find(x => typeof x !== "undefined");

export { first };
