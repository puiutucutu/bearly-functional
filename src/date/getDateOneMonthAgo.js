import { subMonths } from "date-fns";

/**
 * @return {Date} The date one month ago from today.
 */
export const getDateOneMonthAgo = () => subMonths(new Date(), 1);
