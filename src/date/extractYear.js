import { parseDateToStyle } from "./parseDateToStyle";

/**
 * @param {string} date
 * @return {string} 1970 1971 ... 2029 2030
 */
export const extractYear = date => parseDateToStyle("yyyy")(date);
