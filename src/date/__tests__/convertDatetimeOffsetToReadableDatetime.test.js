import { describe, Try } from "riteway";
import { convertDatetimeOffsetToReadableDatetime } from "../convertDatetimeOffsetToReadableDatetime";

describe("convertDatetimeOffsetToReadableDatetime()", async (assert) => {
  assert({
    given: "a TSQL `datetimeoffset(7)` data type",
    should: "return formatted date",
    actual: convertDatetimeOffsetToReadableDatetime(
      "2020-10-19 16:51:31.2270148 -04:00"
    ),
    expected: "Mon Oct 19, 2020 at 16:51",
  });

  assert({
    given: "an empty string",
    should: "throw",
    actual: Try(convertDatetimeOffsetToReadableDatetime, "").toString(),
    expected: "RangeError: Invalid time value",
  });
});
