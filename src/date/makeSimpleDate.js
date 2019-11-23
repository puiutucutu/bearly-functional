import { makeDate } from "./makeDate";

export const makeSimpleDate = date => makeDate("MMM dd, yyyy")(date);
