import { format } from "date-fns";
import { formats } from "./formats";

export const getYmdDateToday = () => format(new Date(), formats.ymd);
