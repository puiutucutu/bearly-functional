import { map } from "./map"

export const flatMap = (f) => (xs) => Array.prototype.concat(...map (f) (xs));
