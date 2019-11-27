/**
 * @param {Object} counts
 * @return {Object}
 * @example
 *
 * const occurrenceCounts = { apple: 3, orange: 1, banana: 2 };
 * sortByCountDesc(occurrenceCounts); //=> {apple: 3, banana: 2, orange: 1}
 */
const sortByCountDesc = counts => {
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .reduce((acc, x) => ((acc[x] = counts[x]), acc), {});
};

export { sortByCountDesc };
