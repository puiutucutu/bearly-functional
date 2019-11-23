import { describe, Try } from "riteway";
import { dictGroupByKey } from "../dictGroupByKey";

describe("dictGroupByKey()", async assert => {
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
    actual: typeof dictGroupByKey ("name"),
    expected: "function"
  });

  assert({
    given: "args",
    should: "return an object",
    actual: dictGroupByKey ("name") (persons),
    expected: {
      John: [
        { id: 1, name: "John" }
      ],
      James: [
        { id: 2, name: "James" },
        { id: 4, name: "James" },
        { id: 6, name: "James" }
      ],
      Jack: [
        { id: 3, name: "Jack" },
        { id: 5, name: "Jack" }
      ]
    }
  });
});
