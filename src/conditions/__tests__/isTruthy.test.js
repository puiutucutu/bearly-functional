import { describe } from "riteway";
import { is } from "../is";

describe("is", async assert => {
  assert({
    given: "primitives",
    should: "evaluate each primitive to correct boolean value",
    actual:
      is({}) === true &&
      is([]) === true &&
      is(true) === true &&
      is(false) === false &&
      is(0) === false &&
      is("0") === true &&
      is("") === false &&
      is(``) === false &&
      is(null) === false &&
      is(undefined) === false &&
      is(void 0) === false &&
      is(NaN) === false,
    expected: true
  });
});
