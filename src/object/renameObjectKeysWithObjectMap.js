import { reduce } from "../list"

/**
 * @param {Object} defMap
 * @return {function(obj: Object): Object}
 * @example
 * const defMap = { CAN: "Canada", USA: "United States of America" };
 * const defined = renameObjectKeysWithObjectMap (defMap) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
 */
export const renameObjectKeysWithObjectMap = (defMap) => (obj) => {
  const next = {};
  for (const [k, v] of Object.entries(defMap)) {
    next[v] = obj[k];
  }
  return next;
};

const alternate = (defMap) => (obj) => {
  const next = {};
  Object.entries(defMap).forEach(([k, v]) => (next[v] = obj[k]));
  return next;
};

const alternateReducer = (defMap) => (obj) =>
  reduce
  ((acc) => ([key, value]) => (acc[value] = obj[key], acc))
  ({})
  (Object.entries(defMap))
;
