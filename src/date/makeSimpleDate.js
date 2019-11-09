import { makeDate } from "./fns";

export const makeSimpleDate = date => makeDate("MMM dd, yyyy")(date);
