import { describe, Try } from "riteway";
import { splitComma } from "../splitComma";

describe("splitComma()", async assert => {
  assert({
    given: "a string",
    should: "return array",
    actual: splitComma ("foo,bar,baz"),
    expected: ["foo", "bar", "baz"]
  });

  assert({
    given: "a string",
    should: "return array",
    actual: splitComma ("foo, bar, baz"),
    expected: ["foo", " bar", " baz"]
  });

  assert({
    given: "empty string",
    should: "array with empty string",
    actual: splitComma (""),
    expected: [""]
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(splitComma) instanceof TypeError,
    expected: true
  });
});
