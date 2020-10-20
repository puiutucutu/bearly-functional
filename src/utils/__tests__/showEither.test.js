import { describe } from "riteway";
import { showEither } from "../showEither";

describe("showEither", async (assert) => {
  assert({
    given: "a fallback and falsy primitives",
    should: "return the fallback",
    actual:
      showEither("n/a")("") === "n/a" &&
      showEither("n/a")(null) === "n/a" &&
      showEither("n/a")(false) === "n/a" &&
      showEither("n/a")(0) === "n/a",
    expected: true,
  });

  assert({
    given: "a fallback and an empty string",
    should: "return the fallback",
    actual: showEither("n/a")(""),
    expected: "n/a",
  });

  assert({
    given: "a fallback and a single space string",
    should: "return the single space",
    actual: showEither("n/a")(" "),
    expected: " ",
  });

  assert({
    given: "a fallback and a non-empty string",
    should: "return the string",
    actual: showEither("n/a")("John"),
    expected: "John",
  });
});
