import { format, parseISO } from "date-fns";
import { isValidDateISO } from "./isValidDateISO";

/**
 * Attempts to parse a date a date and return the formatted version with given
 * style.
 *
 * @param {string} style
 * @return {function(date: string|Date): string} Returns a function that takes
 *   a style and returns the formatted date. Returns an empty string if the
 *   date could not be parsed.
 */
export const parseDateToStyle = style => date =>
  isValidDateISO(date) ? format(parseISO(date), style) : "";
