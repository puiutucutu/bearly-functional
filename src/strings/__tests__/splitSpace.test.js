import { describe, Try } from "riteway";
import { splitSpace } from "../splitSpace";

describe("splitSpace()", async assert => {
  assert({
    given: "a string",
    should: "return array",
    actual: splitSpace ("foo bar baz"),
    expected: ["foo", "bar", "baz"]
  });

  assert({
    given: "a string with contiguous spaces",
    should: "return an array containing non-spaces as elements as well as one less empty string element(s) then there are spaces in the original string",
    actual: splitSpace ("hello   world"),
    expected: ["hello", "", "", "world"]
  });

  assert({
    given: "empty string",
    should: "return array with an empty string element",
    actual: splitSpace (""),
    expected: [""]
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(splitSpace) instanceof TypeError,
    expected: true
  });
});
