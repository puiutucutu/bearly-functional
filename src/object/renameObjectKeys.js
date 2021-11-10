import { PROTOTYPES, prototype } from "../utils";
import { renameObjectKeysWithMap } from "./renameObjectKeysWithMap";
import { renameObjectKeysWithObjectMap } from "./renameObjectKeysWithObjectMap";

/**
 * @param {Object|Map} defMap
 * @return {function(obj: Object): Object}
 *
 * @example
 *
 * const defMap = { CAN: "Canada", USA: "United States of America" };
 * const defined = renameObjectKeys (defMap) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
 *
 * @example
 *
 * const defMap = new Map();
 * defMap.set("CAN", "Canada");
 * defMap.set("USA", "United States of America");
 *
 * const defined = renameObjectKeysWithMap (defMap) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
 *
 */
export const renameObjectKeys = (defMap) => (obj) => {
  if (prototype(defMap) === PROTOTYPES.MAP) {
    return renameObjectKeysWithObjectMap(defMap)(obj);
  }

  if (prototype(defMap) === PROTOTYPES.OBJECT) {
    return renameObjectKeysWithMap(defMap)(obj);
  }

  throw new Error("`defMap` type must be one of `Object` or `Map`");
};
