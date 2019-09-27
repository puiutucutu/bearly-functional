import { describe } from "riteway";
import { joinWithComma } from "../index";

describe("joinWithComma()", async assert => {
  const should = "return string";

  assert({
    given: "array of strings",
    should,
    actual: joinWithComma(["hello", "world"]),
    expected: "hello,world"
  });

  assert({
    given: "empty array",
    should: "return empty string",
    actual: joinWithComma([]),
    expected: ""
  });
});
