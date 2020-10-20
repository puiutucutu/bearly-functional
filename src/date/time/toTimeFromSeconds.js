/**
 * @param {Number} elapsedTimeInSeconds
 * @return {{hours: number, minutes: number, seconds: number}}
 * @example toTimeFromSeconds(501227); //=> { hours: 139, minutes: 13, seconds: 46 }
 */
function toTimeFromSeconds(elapsedTimeInSeconds) {
  const hr = elapsedTimeInSeconds / 60 / 60;
  const min = (hr % 1) * 60;
  const sec = (min % 1) * 60;

  return {
    hours: Math.trunc(hr),
    minutes: Math.trunc(min),
    seconds: Math.trunc(sec),
  };
}

export { toTimeFromSeconds };
