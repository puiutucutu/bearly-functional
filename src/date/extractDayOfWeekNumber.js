import { parseDateToStyle } from "./parseDateToStyle";

/**
 * @param {string} date
 * @return {string} 1 2 ... 30 31
 */
export const extractDayOfWeekNumber = date => parseDateToStyle("dd")(date);
