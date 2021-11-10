/**
 * @param {Map<String, String>} defMap
 * @return {function(obj: Object): Object}
 * @example
 *
 * const defMap = new Map();
 * defMap.set("CAN", "Canada");
 * defMap.set("USA", "United States of America");
 *
 * const defined = renameObjectKeysWithMap (defMap) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
 */
export const renameObjectKeysWithMap = (defMap) => (obj) => {
  const next = {};
  for (const [key, value] of Map.prototype.entries.call(defMap)) {
    next[value] = obj[key];
  }
  return next;
};

const alternate = (defMap) => (obj) => {
  const next = {};
  Map.prototype.forEach.call(defMap, function (value, key) {
    next[value] = obj[key];
  });
  return next;
};
