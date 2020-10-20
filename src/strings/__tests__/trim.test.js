import { describe } from "riteway";
import { trim } from "../trim";

describe("trim()", async (assert) => {
  assert({
    given: "a string",
    should: "return a string",
    actual: trim(" abc "),
    expected: "abc",
  });
});
