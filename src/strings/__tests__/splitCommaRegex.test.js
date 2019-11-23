import { describe, Try } from "riteway";
import { splitCommaRegex } from "../splitCommaRegex";

describe("splitCommaRegex()", async assert => {
  assert({
    given: "a string",
    should: "return array",
    actual: splitCommaRegex ("foo,bar,baz"),
    expected: ["foo", "bar", "baz"]
  });

  assert({
    given: "empty string",
    should: "array with empty string",
    actual: splitCommaRegex (""),
    expected: [""]
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(splitCommaRegex) instanceof TypeError,
    expected: true
  });
});
