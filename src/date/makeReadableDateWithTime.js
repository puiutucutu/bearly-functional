import { makeDate } from "./fns";

export const makeReadableDateWithTime = date =>
  makeDate("MMM dd, yyyy 'at' HH:mm")(date);
