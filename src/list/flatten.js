import { concat } from "../data/concat";
import { reduce } from "./reduce";

export const flatten = xs => reduce (concat) ([]) (xs);
