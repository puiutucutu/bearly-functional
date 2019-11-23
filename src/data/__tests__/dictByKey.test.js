import { describe, Try } from "riteway";
import { dictByKey } from "../dictByKey";

describe("dictByKey()", async assert => {
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
    actual: typeof dictByKey ("name"),
    expected: "function"
  });

  assert({
    given: "args",
    should: "return a dict of key values for key",
    actual: dictByKey ("name") (persons),
    expected: { John: true, James: true, Jack: true }
  });
});
