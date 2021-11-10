/**
 * @param {{k: string, v: string}} defMap
 * @return {function(obj: Object): Object}
 * @example
 *
 * const defMap = { CAN: "Canada", USA: "United States of America" };
 * const defined = renameObjectKeys (defMap) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
 */
export const renameObjectKeys = (defMap) => (obj) => {
  const next = {};
  for (const [k, v] of Object.entries(defMap)) {
    next[v] = obj[k];
  }
  Object.entries(defMap).forEach(([k, v]) => (next[v] = obj[k]));
  return next;
};
