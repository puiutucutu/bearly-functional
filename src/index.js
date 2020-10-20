import * as conditions from "./conditions";
import * as data from "./data";
import * as date from "./date";
import * as list from "./list";
import * as math from "./math";
import * as object from "./object";
import * as primitive from "./primitive";
import * as strings from "./strings";
import * as utils from "./utils";

// make available as namespaced fns
export {
  conditions,
  data,
  date,
  list,
  math,
  object,
  primitive,
  strings,
  utils,
};

// make available as fn name
export * from "./conditions";
export * from "./data";
export * from "./date";
export * from "./list";
export * from "./math";
export * from "./object";
export * from "./primitive";
export * from "./strings";
export * from "./utils";
