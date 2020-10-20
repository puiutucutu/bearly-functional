import { describe } from "riteway";
import { countOccurrences } from "../countOccurrences";

describe("countOccurrences", async (assert) => {
  const items = ["apple", "orange", "banana", "apple", "banana", "apple"];

  assert({
    given: "an array of items",
    should: "return a frequency dict",
    actual: countOccurrences(items),
    expected: { apple: 3, orange: 1, banana: 2 },
  });
});
