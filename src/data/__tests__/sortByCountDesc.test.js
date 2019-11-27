import { describe, Try } from "riteway";
import { sortByCountDesc } from "../sortByCountDesc";

describe("sortByCountDesc()", async assert => {
  const occurrenceCounts = { apple: 3, orange: 1, banana: 2 };

  assert({
    given: "args",
    should: "return a object",
    actual: sortByCountDesc(occurrenceCounts),
    expected: { apple: 3, banana: 2, orange: 1 }
  });
});
