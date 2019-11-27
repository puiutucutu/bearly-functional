import { describe, Try } from "riteway";
import { sliceObject } from "../sliceObject";

describe("sliceObject()", async assert => {
  const obj = { apple: 3, banana: 2, orange: 1 };

  assert({
    given: "partially applying one arg",
    should: "return a function",
    actual: typeof sliceObject({ start: 0, end: 1 }),
    expected: "function"
  });

  assert({
    given: "args",
    should: "return a object",
    actual: sliceObject({ start: 0, end: 1 })(obj),
    expected: { apple: 3 }
  });

  assert({
    given: "args",
    should: "return a object",
    actual: sliceObject({ start: 0, end: 2 })(obj),
    expected: { apple: 3, banana: 2 }
  });

  assert({
    given: "args",
    should: "return a object",
    actual: sliceObject({ start: 0, end: 3 })(obj),
    expected: { apple: 3, banana: 2, orange: 1 }
  });

  assert({
    given: "args",
    should: "return a object",
    actual: sliceObject({ start: 0, end: 9 })(obj),
    expected: { apple: 3, banana: 2, orange: 1 }
  });
});
