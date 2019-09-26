// import tap from "tap";
// import { joinWithNewLine } from "../index";
//
// tap.test("joinWithNewLine()", function(t) {
//   t.equal(joinWithNewLine(["hello", "world"]), "hello\r\nworld");
//   t.equal(joinWithNewLine([]), "", "returns empty string when given empty array"); // prettier-ignore
//   t.end();
// });

import { describe, Try } from "riteway";
import { joinWithNewLine } from "../joinWithNewLine";

describe("joinWithNewLine()", async assert => {
  const should = "return string";

  assert({
    given: "array of strings",
    should,
    actual: joinWithNewLine(["hello", "world"]),
    expected: "hello\r\nworld"
  });

  assert({
    given: "empty array",
    should: "return empty array",
    actual: joinWithNewLine([]),
    expected: ""
  });

  assert({
    given: "empty string",
    should: "throw a TypeError",
    actual: Try(joinWithNewLine, "") instanceof TypeError,
    expected: true
  });

  assert({
    given: "no arguments",
    should: "throw a TypeError",
    actual: Try(joinWithNewLine) instanceof TypeError,
    expected: true
  });
});
