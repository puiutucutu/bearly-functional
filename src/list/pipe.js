import { reduce } from "./reduce"

export const pipe = (...fns) => x =>
  reduce
    (acc => f => f (acc))
    (x)
    (fns)
  ;
