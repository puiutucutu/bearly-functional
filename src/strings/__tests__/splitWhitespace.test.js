import { describe, Try } from "riteway";
import { splitWhitespace } from "../splitWhitespace";

describe("splitWhitespace()", async assert => {
  assert({
    given: "a string",
    should: "return an array",
    actual: splitWhitespace ("hello \t world"),
    expected: ["hello", "", "", "world"]
  });

  assert({
    given: "empty string",
    should: "return array with an empty string element",
    actual: splitWhitespace (""),
    expected: [""]
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(splitWhitespace) instanceof TypeError,
    expected: true
  });
});
