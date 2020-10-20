import { describe } from "riteway";
import { formatNumberWithComma } from "../formatNumberWithComma";

describe("formatNumberWithComma()", async (assert) => {
  assert({
    given: "a number",
    should: "return a number with commas",
    actual: formatNumberWithComma(100000),
    expected: "100,000",
  });
});
