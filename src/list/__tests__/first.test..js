import { describe } from "riteway";
import { first } from "../first";

describe("first()", async assert => {
  const xs = ["a", "b", "c"];

  assert({
    given: "an array",
    should: "return the first item in the array",
    actual: first(xs),
    expected: "a"
  });

  assert({
    given: "an array",
    should: "return the first array item even when the array is not zero indexed (i.e., sparse array)", // prettier-ignore
    actual: first([, "b", "c"]),
    expected: "b"
  });

  assert({
    given: "empty array",
    should: "return undefined",
    actual: first([]),
    expected: undefined
  });
});
