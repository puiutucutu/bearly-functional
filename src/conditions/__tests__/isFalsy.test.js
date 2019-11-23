import { describe } from "riteway";
import { isFalsy } from "../isFalsy";

describe("isFalsy()", async assert => {
  assert({
    given: "primitives",
    should: "evaluate each primitive to correct boolean value",
    actual:
      isFalsy({}) === false &&
      isFalsy([]) === false &&
      isFalsy(true) === false &&
      isFalsy(false) === true &&
      isFalsy(0) === true &&
      isFalsy("0") === false &&
      isFalsy("") === true &&
      isFalsy(``) === true &&
      isFalsy(null) === true &&
      isFalsy(undefined) === true &&
      isFalsy(void 0) === true &&
      isFalsy(NaN) === true,
    expected: true
  });
});
