import { reduce } from "./reduce"

export const flattens = xs =>
  reduce
    (acc => el => (isArray(el) ? [...acc, ...flattens(el)] : [...acc, el]))
    ([])
    (xs)
;
