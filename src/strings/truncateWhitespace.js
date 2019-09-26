import { replaceString } from "./replaceString";

// truncates all whitespace chars to a single ASCII 32 `SPACE` char
// @see https://stackoverflow.com/a/1279874/1727232
// String -> string
const truncateWhitespace = replaceString(/\s+/g)(" ");

export { truncateWhitespace };
