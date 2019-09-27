import { describe, Try } from "riteway";
import { getPrototype } from "../getPrototype";

describe("getPrototype()", async assert => {
  assert({
    given: "primitives",
    should: "returns proper prototypes",
    actual:
      getPrototype({}) === "[object Object]" &&
      getPrototype([]) === "[object Array]" &&
      getPrototype(7) === "[object Number]" &&
      getPrototype("") === "[object String]" &&
      getPrototype(true) === "[object Boolean]" &&
      getPrototype(false) === "[object Boolean]" &&
      getPrototype(null) === "[object Null]" &&
      getPrototype(undefined) === "[object Undefined]" &&
      getPrototype(void 0) === "[object Undefined]",
    expected: true
  });

  assert({
    given: "no args",
    should: 'returns "[object Undefined]"',
    actual: Try(getPrototype),
    expected: "[object Undefined]"
  });
});
