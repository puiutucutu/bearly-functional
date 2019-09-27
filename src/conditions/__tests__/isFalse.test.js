import { describe, Try } from "riteway";
import { isFalse } from "../isFalse";

describe("isFalse()", async assert => {
  assert({
    given: "primitives",
    should: "evaluate each primitive to correct boolean value",
    actual:
      isFalse({}) &&
      isFalse([]) &&
      !isFalse(7) &&
      isFalse("") &&
      !isFalse(true) &&
      isFalse(false) &&
      isFalse(null) &&
      isFalse(undefined) &&
      isFalse(void 0),
    expected: false
  });
});
