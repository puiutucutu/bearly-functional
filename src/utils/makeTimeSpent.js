/**
 * @param {number} hours
 * @param {number} minutes
 * @returns {string}
 * @example
 *
 * makeTimeSpent(0, 0); //=> ""
 * makeTimeSpent(1, 0); //=> "1 hr"
 * makeTimeSpent(7, 0); //=> "7 hrs"
 * makeTimeSpent(0, 1); //=> "1 min"
 * makeTimeSpent(0, 7); //=> "7 mins"
 * makeTimeSpent(1, 1); //=> "1 hr, 1 min"
 * makeTimeSpent(1, 7); //=> "1 hr, 7 mins"
 * makeTimeSpent(7, 1); //=> "7 hrs, 1 min"
 */
export const makeTimeSpent = (hours, minutes) => {
  if (hours === 0 && minutes === 0) {
    return "";
  }

  if (hours === 0 && minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  if (hours > 0 && minutes === 0) {
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hr${hours > 1 ? "s" : ""}, ${minutes} min${minutes > 1 ? "s" : "" }`;
};
