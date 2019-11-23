import { format } from "date-fns";

/**
 * @param {Date} date
 * @return {string}
 */
export const dateToYmd = date => format(date, "yyyy-MM-dd");
