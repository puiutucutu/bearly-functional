import { parseISO } from "date-fns";

/**
 * @param {string} d A string represntation of some date.
 * @return {boolean}
 * @example
 *
 * new Date(undefined); //=> Invalid Date
 * isNaN(new Date(undefined)); //=> true
 * isNaN(new Date(undefined)) === false ; //=> false
 *
 * isValidDate("2020-01-01"); //=> true
 * isValidDate(undefined); //=> false
 */
export const isValidDate = (d) => isNaN(parseISO(d)) === false;
