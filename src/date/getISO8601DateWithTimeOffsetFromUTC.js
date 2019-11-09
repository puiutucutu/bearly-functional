import { format } from "date-fns";

/**
 * @return {string}
 * @example getISO8601DateWithTimeOffsetFromUTC(); //=> "2007-04-05T12:30-02:00"
 * @see https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators
 */
export const getISO8601DateWithTimeOffsetFromUTC = () => {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
};
