import { describe, Try } from "riteway";
import { filterFalse } from "../filterFalse";

describe("filterFalse()", async assert => {
  const actual = filterFalse([
    {},
    [],
    true,
    false,
    0,
    "0",
    "",
    ``,
    null,
    undefined,
    void 0,
    NaN
  ]);

  const expected = [{}, [], true, "0"];

  assert({
    given: "array of primitives",
    should: "return array of primitives that do not evaluate to false",
    actual,
    expected
  });
});
