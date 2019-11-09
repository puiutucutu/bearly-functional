import { parseDateToStyle } from "./parseDateToStyle";

/**
 * @param {string} date
 * @return {string} Sunday Monday ... Friday Saturday
 */
export const extractDayOfWeek = date => parseDateToStyle("EEEE")(date);
