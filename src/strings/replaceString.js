import S from "sanctuary";

// replaceString :: (String -> (String -> String)) -> String
const replaceString = S.curry3((what, replacement, string) =>
  string.replace(what, replacement)
);

export { replaceString };
