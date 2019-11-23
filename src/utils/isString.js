import { getPrototype } from "./getPrototype";

const isString = x => getPrototype(x) === "[object String]";

export { isString };
