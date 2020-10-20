import { differenceInYears } from "date-fns";

/**
 * @param {Date} dob
 * @return {number|NaN}
 */
const age = (dob) => Math.abs
(
  differenceInYears
  (
    dob,
    new Date()
  )
);

export { age };
