import { format, isValid, parseISO } from "date-fns";

/**
 * @param {String} style
 * @return {function(date: *): String} The formatted date string of an empty
 *   string if the date was not valid.
 */
export const makeDate = style => date =>
  isValid(parseISO(date)) ? format(parseISO(date), style) : "";
