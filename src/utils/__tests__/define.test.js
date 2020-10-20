import { describe } from "riteway";
import { define } from "../index";

describe("define", async (assert) => {
  const dict = { GL: "Gold", SI: "Silver" };

  assert({
    given: "an empty string to lookup key",
    should: "return the empty string",
    actual: define(dict)(""),
    expected: "",
  });

  assert({
    given: "a lookup key not in the dict",
    should: "return the original lookup key",
    actual: define(dict)("CL"),
    expected: "CL",
  });

  assert({
    given: "a lookup key in the dict",
    should: "return the value of the matched key pair",
    actual: define(dict)("GL"),
    expected: "Gold",
  });
});
