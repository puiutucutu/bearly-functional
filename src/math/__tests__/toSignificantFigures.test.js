import { describe } from "riteway";
import { toSignificantFigures } from "../toSignificantFigures";

describe("toSignificantFigures", async (assert) => {
  assert({
    given: "an integer to to no significant figure",
    should: "return a string representation of the integer",
    actual: toSignificantFigures(0)(10),
    expected: "10",
  });

  assert({
    given: "an integer to one significant figure",
    should: "a string representation of a float",
    actual: toSignificantFigures(1)(10),
    expected: "10.0",
  });

  assert({
    given: "an integer to two significant figures",
    should: "a string representation of a float",
    actual: toSignificantFigures(2)(10),
    expected: "10.00",
  });
});
