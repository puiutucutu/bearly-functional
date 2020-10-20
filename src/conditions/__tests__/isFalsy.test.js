import { describe } from "riteway";
import { isNot } from "../isNot";

describe("isNot", async assert => {
  assert({
    given: "primitives",
    should: "evaluate each primitive to correct boolean value",
    actual:
      isNot({}) === false &&
      isNot([]) === false &&
      isNot(true) === false &&
      isNot(false) === true &&
      isNot(0) === true &&
      isNot("0") === false &&
      isNot("") === true &&
      isNot(``) === true &&
      isNot(null) === true &&
      isNot(undefined) === true &&
      isNot(void 0) === true &&
      isNot(NaN) === true,
    expected: true
  });
});
