import { describe, Try } from "riteway";
import { filterFalse } from "../filterFalse";

describe("filterFalse()", async assert => {
  assert({
    given: "array of primitives",
    should: "return array of primitives that do not evaluate to false",
    actual: filterFalse ([{}, [], 7, "", true, false, null, undefined, void 0]),
    expected: [{}, [], 7, true]
  });
});
