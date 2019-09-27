import { describe, Try } from "riteway";
import { splitNewLines } from "../splitNewLines";

describe("splitNewLines()", async assert => {
  assert({
    given: "a string with `\n` line break",
    should: "return array",
    actual: splitNewLines ("hello \n world"),
    expected: ["hello ", " world"]
  });

  assert({
    given: "a string with the `\r\n` line break",
    should: "return array",
    actual: splitNewLines ("hello \r\n world"),
    expected: ["hello ", " world"]
  });

  assert({
    given: "a string with adjacent line breaks",
    should: "return array with one less space character than there are line breaks",
    actual: splitNewLines ("hello \n \n \n world"),
    expected: ["hello ", " ", " ", " world"]
  });

  assert({
    given: "empty string",
    should: "array with empty string",
    actual: splitNewLines (""),
    expected: [""]
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(splitNewLines) instanceof TypeError,
    expected: true
  });
});
