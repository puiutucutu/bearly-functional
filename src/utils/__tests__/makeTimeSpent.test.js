import { describe } from "riteway";
import { makeTimeSpent } from "../makeTimeSpent";

describe("makeTimeSpent()", async (assert) => {
  assert({
    given: "no hours and no minutes",
    should: "return empty string",
    actual: makeTimeSpent(0, 0),
    expected: "",
  });

  assert({
    given: "an hour and no minutes",
    should: "return a string",
    actual: makeTimeSpent(1, 0),
    expected: "1 hr",
  });

  assert({
    given: "many hours and no minutes",
    should: "return a string",
    actual: makeTimeSpent(7, 0),
    expected: "7 hrs",
  });

  assert({
    given: "no hours and a minute",
    should: "return a string",
    actual: makeTimeSpent(0, 1),
    expected: "1 min",
  });

  assert({
    given: "no hours and many minutes",
    should: "return a string",
    actual: makeTimeSpent(0, 7),
    expected: "7 mins",
  });

  assert({
    given: "an hour and a minute",
    should: "return a string",
    actual: makeTimeSpent(1, 1),
    expected: "1 hr, 1 min",
  });

  assert({
    given: "an hour and many minutes",
    should: "return a string",
    actual: makeTimeSpent(1, 7),
    expected: "1 hr, 7 mins",
  });

  assert({
    given: "hours and minutes",
    should: "return a string",
    actual: makeTimeSpent(7, 7),
    expected: "7 hrs, 7 mins",
  });
});
