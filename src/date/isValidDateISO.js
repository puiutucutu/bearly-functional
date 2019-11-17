import { isValid, parseISO } from "date-fns";

/**
 * A wrapper function over `date-fns` that converts errors arising from
 * unparseable dates into a boolean.
 *
 * @param {Date} x
 * @return {boolean}
 */
export function isValidDateISO(x) {
  try {
    return isValid(parseISO(x));
  } catch (error) {
    return false;
  }
}
