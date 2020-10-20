import { describe } from "riteway";
import { showEither } from "../showEither";

describe("showEither", async (assert) => {
  assert({
    given: "a fallback and an empty string",
    should: "return the fallback",
    actual: showEither("n/a")(""),
    expected: "n/a",
  });

  assert({
    given: "a fallback and a non-empty string",
    should: "return the string",
    actual: showEither("n/a")("John"),
    expected: "John",
  });
});
