import { describe } from "riteway";
import { capitalize } from "../capitalize";

describe("capitalize()", async assert => {
  assert({
    given: "a string",
    should: "return a string",
    actual: capitalize("abc"),
    expected: "Abc"
  });

  assert({
    given: "empty string",
    should: "empty string",
    actual: capitalize(""),
    expected: ""
  });
});
