import { describe } from "riteway";
import { append } from "../append";

describe("append", async (assert) => {
  assert({
    given: "two strings",
    should: "return a string",
    actual: append("Hello ")("world"),
    expected: "Hello world",
  });

  assert({
    given: "two empty strings",
    should: "empty string",
    actual: append("")(""),
    expected: "",
  });
});
