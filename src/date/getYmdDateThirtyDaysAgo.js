import { format, subDays } from "date-fns";
import { formats } from "./formats";

export const getYmdDateThirtyDaysAgo = () =>
  format(subDays(new Date(), 30), formats.ymd);
