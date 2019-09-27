import { describe, Try } from "riteway";
import { truncateWhitespace } from "../truncateWhitespace";

describe("truncateWhitespace()", async assert => {
  assert({
    given: "a string with contiguous white space chars",
    should: "return a string",
    actual: truncateWhitespace ("foo \t \v bar"),
    expected: "foo bar"
  });

  assert({
    given: "empty string",
    should: ":: String",
    actual: truncateWhitespace (""),
    expected: ""
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(truncateWhitespace) instanceof TypeError,
    expected: true
  });
});
