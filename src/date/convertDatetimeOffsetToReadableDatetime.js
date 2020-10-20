import { format, parse } from "date-fns";

/**
 * @param {string} dt
 * @return {string}
 * @example
 *
 * convertDatetimeOffsetToReadableDatetime("2020-10-19 16:51:31.2270148 -04:00"); //=> "Mon Oct 19, 2020 at 16:51"
 * convertDatetimeOffsetToReadableDatetime(""); //=> RangeError: Invalid time value
 *
 */
const convertDatetimeOffsetToReadableDatetime = (dt) => {
  const dateFormatOut = "EEE MMM dd, yyyy 'at' HH:mm";
  const dateFormatDateTimeOffsetSevenDigitFractionalTSQL =
    "yyyy-MM-dd HH:mm:ss.SSSSSSS xxx"; // 2016-09-29 00:16:23.0000000 -04:00

  const parsed = parse(
    dt,
    dateFormatDateTimeOffsetSevenDigitFractionalTSQL,
    new Date()
  );

  return format(parsed, dateFormatOut);
};

export { convertDatetimeOffsetToReadableDatetime };
