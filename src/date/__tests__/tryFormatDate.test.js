import { describe } from "riteway";
import { tryFormatDate } from "../tryFormatDate";

describe("tryFormatDate()", async (assert) => {
  assert({
    given: "an ISO date and an output format",
    should: "return formatted date",
    actual: tryFormatDate(
      "2016-01-01 13:41:51.000",
      "EEE MMM dd, yyyy 'at' HH:mm",
      ""
    ),
    expected: "Fri Jan 01, 2016 at 13:41",
  });

  assert({
    given: "an invalid date",
    should: "return the fallback value",
    actual: tryFormatDate("", "EEE MMM dd, yyyy 'at' HH:mm", "n/a"),
    expected: "n/a",
  });
});
