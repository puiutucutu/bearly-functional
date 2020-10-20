import { format, parseISO } from "date-fns";

/**
 * @param {string} d
 * @return {string} An empty string if the date cannot be parsed otherwise the
 *   formatted date.
 */
function renderDate(d) {
  if (isNaN(parseISO(d))) {
    return "";
  }

  return format(parseISO(d), "EEE MMM dd, yyyy 'at' HH:mm");
}

export { renderDate };
