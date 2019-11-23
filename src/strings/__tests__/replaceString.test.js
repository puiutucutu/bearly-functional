import { describe, Try } from "riteway";
import { replaceString } from "../replaceString";
import { replaceCommaWithWhitespace } from "../replaceCommaWithWhitespace";

describe("replaceString()", async assert => {
  assert({
    given: "partially applying one arg",
    should: "return a function",
    actual: typeof replaceString ("bar"),
    expected: "function"
  });

  assert({
    given: "partially applying two args",
    should: "return a function",
    actual: typeof replaceString ("bar") (""),
    expected: "function"
  });

  assert({
    given: "three args",
    should: "return a string with adjacent spaces not truncated",
    actual: replaceString ("bar") ("") ("foo bar baz"),
    expected: "foo  baz"
  });

  assert({
    given: "three args where the replace is regex",
    should: "return a string with the replacement made",
    actual: replaceString (/a/gi) ("") ("foo bar baz"),
    expected: "foo br bz"
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(replaceCommaWithWhitespace) instanceof TypeError,
    expected: true
  });
});
