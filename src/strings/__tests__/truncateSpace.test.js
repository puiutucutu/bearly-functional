import { describe, Try } from "riteway";
import { truncateSpace } from "../truncateSpace";

describe("truncateSpace()", async assert => {
  assert({
    given: "a string with contiguous spaces",
    should: "return a string",
    actual: truncateSpace ("foo  bar   baz    qux"),
    expected: "foo bar baz qux"
  });

  assert({
    given: "empty string",
    should: ":: String",
    actual: truncateSpace (""),
    expected: ""
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(truncateSpace) instanceof TypeError,
    expected: true
  });
});
