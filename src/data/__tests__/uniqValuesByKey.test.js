import { describe, Try } from "riteway";
import { uniqValuesByKey } from "../uniqValuesByKey";

describe("uniqValuesByKey()", async assert => {
  const persons = [
    { id: 1, name: "John" },
    { id: 2, name: "James" },
    { id: 3, name: "Jack" },
    { id: 4, name: "James" },
    { id: 5, name: "Jack" },
    { id: 6, name: "James" }
  ];

  assert({
    given: "partially applying one arg",
    should: "return a function",
    actual: typeof uniqValuesByKey ("name"),
    expected: "function"
  });

  assert({
    given: "args",
    should: "return an array",
    actual: uniqValuesByKey ("name") (persons),
    expected: ["John", "James", "Jack"]
  });
});
