import { format } from "date-fns";

/**
 * @return {string}
 * @see https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators
 *
 * @example
 *
 * getISO8601DatetimeOffsetWithMicrosecondsFromUTC(); //=> "2020-01-23T14:33:15.4260000-05:00"
 *
 */

export const getISO8601DatetimeOffsetWithMicrosecondsFromUTC = () => {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSSSxxx");
};
