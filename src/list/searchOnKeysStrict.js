/**
 * Extracts those objects having the exact value on every single specified key.
 *
 * @param {string} searchTerm Value to match against.
 * @param {array} data A 1-d array of objects.
 * @param {array} keys A 1-d array of keys to look up values for in
 *   the `data` array.
 */
export function searchOnKeysStrict(searchTerm, data, keys) {
  return data.filter(function (item) {
    const pattern = new RegExp(searchTerm, "gi");

    let searchTermExistsInEveryKey = true;
    keys.forEach(function (key) {
      if (!(item[key] && item[key].toLowerCase().match(pattern))) {
        searchTermExistsInEveryKey = false;
      }
    });

    return searchTermExistsInEveryKey;
  });
}
