import { describe } from "riteway";
import { isTruthy } from "../isTruthy";

describe("isTruthy()", async assert => {
  assert({
    given: "primitives",
    should: "evaluate each primitive to correct boolean value",
    actual:
      isTruthy({}) === true &&
      isTruthy([]) === true &&
      isTruthy(true) === true &&
      isTruthy(false) === false &&
      isTruthy(0) === false &&
      isTruthy("0") === true &&
      isTruthy("") === false &&
      isTruthy(``) === false &&
      isTruthy(null) === false &&
      isTruthy(undefined) === false &&
      isTruthy(void 0) === false &&
      isTruthy(NaN) === false,
    expected: true
  });
});
