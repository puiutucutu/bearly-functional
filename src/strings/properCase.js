import { map } from "../list/map";
import { lowerCase } from "./lowerCase";
import { upperCase } from "./upperCase";

/**
 * @param {string} x
 * @return {string}
 */
export const properCase = (x) => {
  const [char, ...chars] = x;
  return [upperCase(char), ...map(lowerCase)(chars)].join("");
};
