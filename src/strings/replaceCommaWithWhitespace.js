import S from "sanctuary";

import { replaceString } from "./replaceString";
import { truncateSpace } from "./truncateSpace";

// replaceCommaWithWhitespace :: String -> String
const replaceCommaWithWhitespace = S.pipe([
  replaceString(/,/g)(" "),
  truncateSpace
]);

export { replaceCommaWithWhitespace };
