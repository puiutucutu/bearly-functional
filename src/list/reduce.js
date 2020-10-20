import { uncurry } from "./uncurry";

export const reduce = (reducer) => (initialValue) => (xs) =>
  Array.prototype.reduce.call(
    xs,
    uncurry (reducer), //=> reducer (accumulator, currentValue)
    initialValue
  );
