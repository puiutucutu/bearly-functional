import { parseDateToStyle } from "./parseDateToStyle";

/**
 * @param {string} date
 * @return {string} 00 01 ... 22 23
 */
export const extractHour = date => parseDateToStyle("hh")(date);
