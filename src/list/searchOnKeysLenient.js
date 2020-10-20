/**
 * Extracts those objects having the exact value on one or more of the specified keys.
 *
 * @param {string} searchTerm The term to search fo each filter.
 * @param {array} data A 1-d array of objects.
 * @param {array} keys A 1-d array of keys to look up values for in
 *   the `data` array.
 */
export function searchOnKeysLenient(searchTerm, data, keys) {
  const pattern = new RegExp(searchTerm, "gi");
  const filteredDataIndices = [];

  data.forEach(function (item, itemIndex) {
    keys.forEach(function (key) {
      if (item[key] && item[key].toLowerCase().match(pattern)) {
        filteredDataIndices.push(itemIndex);
      }
    });
  });

  const uniqueFilteredDataIndices = [...new Set(filteredDataIndices)];

  // gather items by intersecting with unique filtered indices
  return data.filter(function (item, itemIndex) {
    return uniqueFilteredDataIndices.indexOf(itemIndex) !== -1;
  });
}
