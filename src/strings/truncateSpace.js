import { replaceString } from "./replaceString";

// String -> String
// truncates ASCII 32 `SPACE` whitespace chars to one char
// @see https://stackoverflow.com/a/7151225/1727232
// @see https://stackoverflow.com/a/1279878/1727232
// @example truncate("hello   world"); //=> "hello world"
const truncateSpace = replaceString(/ {2,}/g)(" ");

export { truncateSpace };
