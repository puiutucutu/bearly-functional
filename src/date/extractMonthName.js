import { parseDateToStyle } from "./parseDateToStyle";

/**
 * @param {string} date
 * @return {string} January February ... November December
 */
export const extractMonthName = date => parseDateToStyle("MMMM")(date);
