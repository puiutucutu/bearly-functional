import { format, parseISO } from "date-fns";

/**
 * @param {string} date A valid ISO8601 date like `2016-01-01 13:41:51.000`
 * @param {string} dateFormat
 * @param {string} fallbackText
 * @return {string} The value of `fallbackText` if the date cannot be parsed
 *   otherwise the formatted date.
 *
 * @example
 *
 * // ex. 1
 * tryFormatDate(
 *   "2016-01-01 13:41:51.000",
 *   "EEE MMM dd, yyyy 'at' HH:mm",
 *   ""
 * ); //=> "Fri Jan 01, 2016 at 13:41"
 *
 * // ex. 2
 * tryFormatDate(
 *   "",
 *   "EEE MMM dd, yyyy 'at' HH:mm",
 *   "n/a"
 * ); //=> "n/a"
 *
 * // ex. 3
 * const payload = { id: 123, createdAt: "2016-01-01 13:41:51.000" };
 * const createdAtParsed = payload.createdAt && tryFormatDate(
 *   payload.createdAt,
 *   "EEE MMM dd, yyyy 'at' HH:mm",
 *   ""
 * ); //=> "Fri Jan 01, 2016 at 13:41"
 *
 */
function tryFormatDate(date, dateFormat, fallbackText) {
  if (isNaN(parseISO(date))) {
    return fallbackText;
  }

  return format(parseISO(date), dateFormat);
}

export { tryFormatDate };
