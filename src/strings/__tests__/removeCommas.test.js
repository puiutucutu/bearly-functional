import { describe, Try } from "riteway";
import { removeCommas } from "../removeCommas";

describe("removeCommas()", async assert => {
  const should = "return string";

  assert({
    given: "a string",
    should,
    actual: removeCommas("hello, world,"),
    expected: "hello world"
  });

  assert({
    given: "empty string",
    should: "empty string",
    actual: removeCommas(""),
    expected: ""
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(removeCommas) instanceof TypeError,
    expected: true
  });
});
