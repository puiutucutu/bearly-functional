import { format } from "date-fns";

/**
 * @return {string}
 * @see https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators
 *
 * @example
 *
 * getISO8601DateWithTimeOffsetFromUTC(); //=> "2007-04-05T12:30-02:00"
 * getISO8601DateWithTimeOffsetFromUTC(true); //=> "2020-01-23T14:33:15.4260000-05:00"
 *
 */
export const getISO8601DateWithTimeOffsetFromUTC = (microseconds = false) => {
  return microseconds
    ? format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSSSxxx")
    : format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
};
