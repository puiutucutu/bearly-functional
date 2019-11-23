import { makeDate } from "./makeDate";

export const makeReadableDateWithTime = date =>
  makeDate("MMM dd, yyyy 'at' HH:mm")(date);
